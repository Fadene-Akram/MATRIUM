import React from "react";
import { Line } from "react-chartjs-2";
import styles from "./FinancesChart.module.css";
import dummyData from "../../data/DummyDashboardData";

const getChartData = (finances) => ({
  labels: finances?.labels || [],
  datasets: [
    {
      label: "Revenue",
      data: finances?.revenue || [],
      borderColor: "#4caf50",
      fill: false,
    },
    {
      label: "Expenses",
      data: finances?.expenses || [],
      borderColor: "#f44336",
      fill: false,
    },
  ],
});

const getChartOptions = () => ({
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
});

const FinancesChart = () => {
  const { finances } = dummyData;

  // Chart data and options
  const data = getChartData(finances);
  const options = getChartOptions();

  return (
    <div className={styles.chartContainer}>
      <h2>Finances Overview</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default FinancesChart;
