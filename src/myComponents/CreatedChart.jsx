import React, { useEffect, useState } from "react";

const CreatedChart = ({ choices, history }) => {
  const [hasChoices, setHasChoices] = useState(false);
  const [chartData, setChartData] = useState([]); // Initialize chartData

  useEffect(() => {
    // Check if choices exist and has items
    setHasChoices(choices && Object.keys(choices).length > 0);
    console.log("Current choices:", choices); // Logging the choices state

    if (hasChoices) {
      const { symbol, interval } = choices; // Destructure symbol and interval from choices

      // Initialize WebSocket
      const ws = new WebSocket(
        `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`
      );

      ws.onmessage = (event) => {
        
        const data = JSON.parse(event.data);
        console.log(data)
        if (data.k && data.k.x) {
          // Check for candlestick close
          setChartData((prevData) => [
            ...prevData,
            {
              time: data.k.t,
              open: data.k.o,
              high: data.k.h,
              low: data.k.l,
              close: data.k.c,
            },
          ]);
        }
      };

      console.log(chartData)
      // Clean up the WebSocket on component unmount or when choices change
      return () => {
        ws.close();
      };
    }
  }, [choices]); // Run effect when choices change

  return (
    <div className="w-full h-[90%] bg-slate-200">
      {hasChoices ? (
        <div>
          <p>
            Symbol: {choices.symbol} selected with interval: {choices.interval}
          </p>
          <h3 className="font-bold mt-0 ">Selection History:</h3>
          <ul>
            {history.map((entry, index) => (
              <li key={index}>
                Symbol: {entry.symbol}, Interval: {entry.interval}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Choose a symbol</p>
      )}
    </div>
  );
};

export default CreatedChart;
