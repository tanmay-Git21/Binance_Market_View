import React, { useEffect, useState } from "react";
import ActualChart from "./ActualChart";

const CreatedChart = ({ choices }) => {
  const [chartData, setChartData] = useState([]); // Initialize chartData

  useEffect(() => {
    // Check if choices are present and have items
    const hasChoices = choices && Object.keys(choices).length > 0;

    if (hasChoices) {
      const { symbol, interval } = choices; // Destructure symbol and interval from choices

      // Initialize WebSocket
      const ws = new WebSocket(
        `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`
      );

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Raw data from WebSocket:", data);
        console.log("Current candlestick status:", data.k);
      
        // Check if the candlestick has closed
        if (data.k) {
          console.log("Candlestick closed:", data.k);
          setChartData((prevData) => [
            ...prevData,
            {
              time: data.k.t,                  // Candlestick open time
              open: parseFloat(data.k.o),      // Open price
              high: parseFloat(data.k.h),      // High price
              low: parseFloat(data.k.l),       // Low price
              close: parseFloat(data.k.c),     // Close price
              volume: parseFloat(data.k.v),    // Add volume if available
            },
          ]);
        } else {
          console.log("Candlestick is still open. Waiting for close...");
        }
      };
      
      // Clean up the WebSocket on component unmount or when choices change
      return () => {
        ws.close();
      };
    }
  }, [choices]);

  // Log updated chartData when it changes
  useEffect(() => {
    console.log("Updated chartData:", chartData);
  }, [chartData]);

  return (
    <div className="w-full h-[90%] bg-slate-100">
      {chartData.length === 0 ? (
        <p>Select your Currency and timeframe .....</p>
      ) : (
        <ActualChart chartData={chartData} />
      )}
    </div>
  );
};

export default CreatedChart;
