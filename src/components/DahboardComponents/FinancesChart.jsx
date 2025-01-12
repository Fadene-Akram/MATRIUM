import { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useQuery } from "@tanstack/react-query";
import styles from "./FinancesChart.module.css";
import { fetchLineChartUpdates } from "../../api/Api";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Helper to structure chart data
const getChartData = (finances) => ({
  labels: finances?.labels || [],
  datasets: [
    {
      label: "Revenue",
      data: finances?.revenue || [],
      borderColor: "#4caf50",
      backgroundColor: "rgba(76, 175, 80, 0.3)",
      fill: true,
    },
    {
      label: "Expenses",
      data: finances?.expenses || [],
      borderColor: "#f44336",
      backgroundColor: "rgba(244, 67, 54, 0.3)",
      fill: true,
    },
  ],
});

// Chart configuration
const getChartOptions = () => ({
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Finances Overview",
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Months",
      },
    },
    y: {
      title: {
        display: true,
        text: "Amount ($)",
      },
    },
  },
});

const FinancesChart = () => {
  const [isInView, setIsInView] = useState(false);
  const chartRef = useRef(null);

  // Fetch data using React Query
  const {
    data: finances,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["finances"],
    queryFn: fetchLineChartUpdates,
  });

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the chart is visible
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

  const data = finances ? getChartData(finances) : null;
  const options = getChartOptions();

  return (
    <div ref={chartRef} className={styles.chartContainer}>
      <h2>Finances Overview</h2>
      {isLoading ? (
        <p>Loading finances data...</p>
      ) : isError ? (
        <p>Error loading finances data.</p>
      ) : isInView && finances ? (
        <Line data={data} options={options} />
      ) : (
        <p>No finances data available.</p>
      )}
    </div>
  );
};

export default FinancesChart;
