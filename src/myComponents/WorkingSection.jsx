import React, { useState } from "react";
import { CreatedDropdown } from "./CreatedDropdown";
import CreatedChart from "./ShowingChartSection";

const WorkingCharts = () => {
  const [choices, setChoices] = useState({});
  const [symbol, setSymbol] = useState('ETH/USDT'); // Default symbol
  const [interval, setInterval] = useState('5m'); // Default interval is "5m"

  // Handling symbol selection
  const handleSymbolSelection = (selectedSymbol) => {
    console.log("Selected Symbol:", selectedSymbol);
    setSymbol(selectedSymbol);

    const newChoices = { symbol: selectedSymbol.replace('/', ''), interval };
    setChoices(newChoices);
  };

  // Handling interval selection
  const handleIntervalSelection = (selectedInterval) => {
    console.log("Selected Interval:", selectedInterval);
    setInterval(selectedInterval);

    // Update choices with selected interval
    const newChoices = { ...choices, interval: selectedInterval };
    setChoices(newChoices);
  };

  const symbolItems = [
    { value: "ETH/USDT", label: "ETH/USDT" },
    { value: "BNB/USDT", label: "BNB/USDT" },
    { value: "DOT/USDT", label: "DOT/USDT" }
  ];

  const intervalItems = [
    { value: "1m", label: "1 Minute" },
    { value: "3m", label: "3 Minutes" },
    { value: "5m", label: "5 Minutes" },
  ];

  return (
    <div className="w-full h-[90%] p-2">
      <div className="w-full h-[10%] flex items-center gap-6 p-4">
        <CreatedDropdown 
          categoryName="symbol" 
          items={symbolItems}  
          onSelect={handleSymbolSelection} 
        />
        <CreatedDropdown 
          categoryName="interval" 
          items={intervalItems} 
          onSelect={handleIntervalSelection} 
        />
      </div>
      <CreatedChart choices={choices} symbol={symbol} interval={interval} />
    </div>
  );
};

export default WorkingCharts;
