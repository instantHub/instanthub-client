import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const MonthlyOrdersChart = ({ data, category, xTitle, yTitle, color }) => {
  // Prepare labels and data for the chart
  const labels = data?.map((item) => item.month);
  const orderCounts = data?.map((item) => item.orders);

  const chartData = {
    labels,
    datasets: [
      {
        label: category,
        data: orderCounts,
        backgroundColor: color?.bgColor,
        borderColor: color?.borderColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        title: { display: true, text: xTitle },
      },
      y: {
        title: { display: true, text: yTitle },
        beginAtZero: true,
      },
    },
  };

  return (
    // <div className="w-[500px] h-fit">
    <div className={`${labels.length > 5 ? "w-[500px]" : "w-[300px]"} h-fit`}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default MonthlyOrdersChart;
