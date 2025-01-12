import { useState, useEffect, useRef } from "react";
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
import { useQuery } from "@tanstack/react-query";
import styles from "./StockUpdatesChart.module.css";
import { fetchStockUpdates } from "../../api/Api";

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

const getChartData = (stockUpdates) => {
  const colors = stockUpdates?.stockLevels.map((level) => {
    if (level === 0) return "rgba(255, 99, 132, 0.7)"; // Red for 0
    if (level < 10) return "rgba(255, 159, 64, 0.7)"; // Orange for less than 10
    return "rgba(75, 192, 192, 0.7)"; // Green for 10 or more
  });

  return {
    labels: stockUpdates?.labels || [],
    datasets: [
      {
        label: "Stock Levels",
        data: stockUpdates?.stockLevels || [],
        backgroundColor: colors,
        borderColor: colors.map((color) => color.replace("0.7", "1")), // Stronger border colors
        borderWidth: 1,
      },
    ],
  };
};

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

  // React Query to fetch stock updates
  const {
    data: stockUpdates,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["stockUpdates"],
    queryFn: fetchStockUpdates,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 } // Adjust threshold as needed
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

  const data = stockUpdates ? getChartData(stockUpdates) : null;
  const options = getChartOptions();

  return (
    <div ref={chartRef} className={styles.stockChartContainer}>
      <h2>Stock Updates</h2>
      {isLoading ? (
        <p>Loading stock updates...</p>
      ) : isError ? (
        <p>Error loading stock updates.</p>
      ) : isInView && stockUpdates ? (
        <Bar data={data} options={options} />
      ) : (
        <p>No stock updates available.</p>
      )}
    </div>
  );
};

export default StockUpdatesChart;
