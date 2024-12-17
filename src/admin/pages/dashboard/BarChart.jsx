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

const BarChart = ({
  category,
  data,
  xTitle,
  yTitle,
  color = {
    bgColor: "rgba(75, 192, 192, 0.6)",
    borderColor: "rgba(75, 192, 192, 1)",
  },
  chartFor,
}) => {
  // Prepare labels and data for the chart
  const labels = data?.map((item) => item.brand || item.label);
  const productCounts = data?.map((item) => item.productCount || item.count);

  // console.log("BarChart data:", category, data);

  const chartData = {
    labels,
    datasets: [
      {
        label: category,
        data: productCounts,
        // backgroundColor: "rgba(75, 192, 192, 0.6)",
        backgroundColor: color.bgColor,
        borderColor: color.borderColor,
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
    <div
      className={`${
        labels?.length > 5
          ? `w-[500px] ${chartFor === "Orders" && "max-sm:w-[300px]"}`
          : `w-[300px] ${chartFor === "Orders" && "max-sm:w-[280px]"}`
      } h-fit`}
      // className={`w-[500px] h-fit`}
    >
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
