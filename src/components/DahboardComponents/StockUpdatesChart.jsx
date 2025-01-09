import React, { useState, useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import dummyData from "../../data/DummyDashboardData.json";
import styles from "./StockUpdatesChart.module.css";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Helper function for chart data
const getChartData = (stockUpdates) => ({
  labels: stockUpdates?.labels || [],
  datasets: [
    {
      label: "Stock Levels",
      data: stockUpdates?.stockLevels || [],
      backgroundColor: "rgba(75, 192, 192, 0.5)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
});

// Helper function for chart options
const getChartOptions = () => ({
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Stock Levels by Item",
    },
  },
});

const StockUpdatesChart = () => {
  const [isInView, setIsInView] = useState(false);
  const chartRef = useRef(null);

  const { stockUpdates } = dummyData || {};

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 } // Adjust threshold as needed (0.5 means 50% of the element is visible)
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current);
      }
    };
  }, []);

  // Chart data and options
  const data = getChartData(stockUpdates);
  const options = getChartOptions();

  return (
    <div ref={chartRef} className={styles.stockChartContainer}>
      <h2>Stock Updates</h2>
      {isInView && stockUpdates ? (
        <Bar data={data} options={options} />
      ) : (
        <p>No stock updates available.</p>
      )}
    </div>
  );
};

export default StockUpdatesChart;
