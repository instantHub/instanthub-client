import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ dataProp, chartFor }) => {
  // Prepare labels and data for the chart
  const labels = dataProp?.map((item) =>
    chartFor === "Categories" ? item.name : `${item.category} Brands`
  );
  const counts = dataProp?.map((item) =>
    chartFor === "Categories" ? 1 : item.brands.length
  );

  //   console.log("PieChart dataProp:", dataProp);
  console.log("PieChart:", labels, counts);

  // Sample data
  const data = {
    // labels: ["Electronics", "Furniture", "Clothing", "Books"],
    labels,
    datasets: [
      {
        label: "Categories",
        data: counts, // Example data
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // Red
          "rgba(54, 162, 235, 0.6)", // Blue
          "rgba(255, 206, 86, 0.6)", // Yellow
          "rgba(75, 192, 192, 0.6)", // Green
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // Position of the legend
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}%`,
        },
      },
    },
  };

  return (
    <div style={{ width: "200px", margin: "0 auto" }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
