'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface GenericChartProps {
  data: any[];
}

const GenericChart: React.FC<GenericChartProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  const numericKeys = Object.keys(data[0]).filter((key) =>
    typeof data[0][key] === 'number' || !isNaN(Number(data[0][key]))
  );

  const chartData = {
    labels: numericKeys,
    datasets: [
      {
        label: 'المتوسط الحسابي',
        data: numericKeys.map((key) => {
          const values = data
            .map((row) => Number(row[key]))
            .filter((val) => !isNaN(val));
          const avg =
            values.reduce((sum, val) => sum + val, 0) / (values.length || 1);
          return parseFloat(avg.toFixed(2));
        }),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="mt-10 w-[90%] max-w-4xl mx-auto text-white">
      <h3 className="text-2xl font-semibold mb-4">📊 التحليل الإحصائي العام للأعمدة الرقمية</h3>
      <Bar data={chartData} options={{
        responsive: true,
        plugins: {
          legend: { labels: { color: 'white' } },
        },
        scales: {
          x: { ticks: { color: 'white' } },
          y: { ticks: { color: 'white' } },
        }
      }} />
    </div>
  );
};

export default GenericChart;
