'use client';

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import React from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BudgetChart = ({ data }: { data: any }) => {
  console.log(' chart data', data);
  const chartData = {
    labels: data.map((d: any) => d.category),
    datasets: [
      {
        label: 'Gelir-Giderler',
        data: data.map((d: any) => d.amount),

        backgroundColor: data.map((d: any) =>
          d.amount < 0 ? 'rgba(255, 99, 132, 0.2)' : 'rgba(75, 192, 192, 0.2)'
        ),
        borderColor: data.map((d: any) =>
          d.amount < 0 ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)'
        ),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default BudgetChart;
