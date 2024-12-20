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
import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import { Button } from '@/components/ui/button';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BudgetChart = ({ data }: { data: Partial<Transaction>[] }) => {
  const chartRef = useRef(null); // Reference to the chart instance

  const chartData = {
    labels: data.map((d) => d.category),
    datasets: [
      {
        label: 'Gelir-Giderler',
        data: data.map((d) => d.amount),
        backgroundColor: data.map((d) =>
          (d?.amount ?? 0) < 0
            ? 'rgba(255, 99, 132, 0.2)'
            : 'rgba(75, 192, 192, 0.2)'
        ),
        borderColor: data.map((d) =>
          (d?.amount ?? 0) < 0
            ? 'rgba(255, 99, 132, 1)'
            : 'rgba(75, 192, 192, 1)'
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

  const generatePDF = () => {
    if (chartRef.current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const canvas = chartRef.current.canvas;
      if (canvas) {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF();
        doc.addImage(imgData, 'PNG', 10, 10, 180, 160);
        doc.save('budget-chart.pdf');
      }
    }
  };

  return (
    <div>
      <Button
        onClick={generatePDF}
        className="rounded-full float-end text-white"
      >
        Download PDF
      </Button>
      <Bar ref={chartRef} data={chartData} options={chartOptions} />
    </div>
  );
};

export default BudgetChart;
