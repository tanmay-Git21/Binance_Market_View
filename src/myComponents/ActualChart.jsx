import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { CandlestickController, CandlestickElement } from "chartjs-chart-financial";
import moment from 'moment';
import 'chartjs-adapter-moment';

// Register all required components
Chart.register(...registerables, CandlestickController, CandlestickElement);

const ActualChart = ({ chartData }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Create a ref for the chart instance

  useEffect(() => {
    // Check if chart data is available
    if (chartData.length === 0) {
      console.log("No data available"); // Debugging statement
      return;
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) {
      console.error("Canvas context not found");
      return;
    }

    // Destroy the previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Prepare candlestick data
    const candlestickData = chartData.map(data => ({
      x: moment(data.time),
      o: data.open,
      h: data.high,
      l: data.low,
      c: data.close,
    }));

    // Prepare volume data
    const volumeData = chartData.map(data => ({
      x: moment(data.time),
      y: data.volume,
    }));

    const maxVolume = Math.max(...volumeData.map(v => v.y)); // Calculate max volume for y-axis

    const config = {
      data: {
        datasets: [
          {
            type: 'candlestick', // Candlestick chart type
            label: 'Financial Graph',
            data: candlestickData,
            borderColor: {
              up: 'rgb(26, 152, 129)',
              down: 'rgb(239, 57, 74)',
            },
            backgroundColor: {
              up: 'rgba(26, 152, 129, 0.5)',
              down: 'rgba(239, 57, 74, 0.5)',
            },
            borderWidth: 1,
            order: 10,
            yAxisID: 'y',
          },
          {
            type: 'bar', // Volume bar type
            label: 'Volume',
            data: volumeData,
            backgroundColor: volumeData.map((vol, index) =>
              chartData[index].open < chartData[index].close ? 'rgba(26, 152, 129, 0.5)' : 'rgba(239, 57, 74, 0.5)'
            ),
            borderColor: '#fff',
            borderWidth: 1,
            order: 12,
            yAxisID: 'volume',
            barPercentage: 0.5, // Adjust this for bar thickness
            barThickness: 2, // Thinner bars
            maxBarThickness: 5, // Maximum bar thickness
          },
        ],
      },
      options: {
        parsing: false, // Disable parsing
        spanGaps: true, // For better performance
        animation: false, // Disable animation for performance
        pointRadius: 0, // Disable point radius for performance
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'timeseries',
            time: {
              unit: 'minute', // Change as necessary (e.g., hour, day)
              tooltipFormat: 'll HH:mm',
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10, // Increase to show more ticks on the x-axis
              maxRotation: 0, // Prevent rotation of tick labels
              minRotation: 0, // Prevent rotation of tick labels
            },
          },
          y: {
            type: 'linear',
            position: 'left',
            beginAtZero: false,
            min: Math.min(...candlestickData.map(d => d.l)) - 10, // Custom minimum for better visibility
            max: Math.max(...candlestickData.map(d => d.h)) + 10, // Custom maximum for better visibility
            ticks: {
              autoSkip: true,
              maxTicksLimit: 5, // Limit the number of ticks on the y-axis
            },
          },
          volume: {
            type: 'linear',
            position: 'right',
            beginAtZero: true,
            max: maxVolume * 1.2, // Set maximum for volume to give some margin
            grid: {
              display: false, // Hide grid lines for better presentation
            },
            ticks: {
              display: false, // Hide volume ticks for cleaner look
            },
          },
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
      },
    };

    // Create a new chart instance and store it in the ref
    chartInstanceRef.current = new Chart(ctx, config);

    // Clean up the chart on component unmount
    return () => {
      chartInstanceRef.current?.destroy(); // Ensure to destroy on unmount
    };
  }, [chartData]);

  return (
    <div className="chart-container" style={{ width: '100%', height: '100%' }}> {/* Adjust height here */}
      <canvas
        ref={chartRef}
        aria-label="Candlestick chart representing market data"
        role="img"
      >
        <p>Your browser does not support the canvas element. Candlestick chart representing market data.</p>
      </canvas>
    </div>
  );
};

export default ActualChart;
