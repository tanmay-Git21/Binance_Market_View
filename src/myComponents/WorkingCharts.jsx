import React, { useState } from "react";
import { CreatedDropdown } from "./CreatedDropdown";
import CreatedChart from "./CreatedChart";

const WorkingCharts = () => {
  const [choices, setChoices] = useState({}); // Current choices
  const [history, setHistory] = useState([]); // History of choices
  const [symbol, setSymbol] = useState('');
  const [interval, setInterval] = useState('5m'); // Default interval is "5m"

// Handling symbol selection
const handleSymbolSelection = (selectedSymbol) => {
  console.log("Selected Symbol:", symbol);
  setSymbol(selectedSymbol);
  
  // Remove '/' from the selected symbol
  const formattedSymbol = selectedSymbol.replace('/', ''); // Removes the '/'
  
  // Set choices with formatted symbol and current interval
  const newChoices = { symbol: formattedSymbol, interval: interval };
  setChoices(newChoices);
  setHistory((prevHistory) => [...prevHistory, newChoices]); // Add to history
};

  // Handling interval selection
  const handleIntervalSelection = (selectedInterval) => {
    console.log("Selected Interval:", selectedInterval);
    setInterval(selectedInterval);
    
    // Update choices with selected interval
    const newChoices = { ...choices, interval: selectedInterval };
    setChoices(newChoices);
    setHistory((prevHistory) => [...prevHistory, newChoices]); // Add to history
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
      <div className="w-full h-[10%] bg-blue-400 flex items-center gap-6 pl-4">
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
      <CreatedChart choices={choices} history={history} />
     
    </div>
  );
};

export default WorkingCharts;
