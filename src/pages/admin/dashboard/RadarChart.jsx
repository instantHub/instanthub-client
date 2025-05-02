import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = () => {
  const data = {
    labels: ["Running", "Swimming", "Cycling", "Weightlifting", "Yoga"],
    datasets: [
      {
        label: "Athlete A",
        data: [20, 30, 50, 40, 25],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Athlete B",
        data: [40, 20, 30, 35, 45],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
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
    scales: {
      r: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-[400px] p-[20px] my-0 mx-auto">
      <h2>Radar Chart</h2>
      <Radar data={data} options={options} />
    </div>
  );
};

export default RadarChart;
