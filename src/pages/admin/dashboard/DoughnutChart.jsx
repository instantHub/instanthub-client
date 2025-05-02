import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ dataProp }) => {
  // const labelsObj = {
  //   Categories: "name",
  //   Brands: "category",
  //   Products: "categoryName",
  // };

  // Prepare labels and data for the chart
  // const labels = dataProp?.map((item) => {
  //   if (chartFor === "Brands") return `${item.category} Brands`;
  //   return item[labelsObj[chartFor]];
  // });
  // const counts = dataProp?.map((item) => {
  //   switch (chartFor) {
  //     case "Categories":
  //       return 1;
  //     case "Brands":
  //       return item.brands.length;
  //     case "Products":
  //       return item.count;
  //     default:
  //       return 1;
  //   }
  // });

  const labels = dataProp?.map((item) => item.label);
  const counts = dataProp?.map((item) => item.count);

  const data = {
    labels,
    datasets: [
      {
        label: "Votes",
        data: counts,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="w-[350px] max-sm:w-[300px] p-[20px] my-0 mx-0">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
