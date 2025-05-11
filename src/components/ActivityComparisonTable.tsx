'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type Stats = {
  mean: number;
  min: number;
  max: number;
  count: number;
};

interface AnalyticsChartProps {
  data: Record<string, Stats>;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data }) => {
  const labels = Object.keys(data);
  const meanValues = labels.map(label => data[label].mean);
  const countValues = labels.map(label => data[label].count);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'المتوسط',
        data: meanValues,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'عدد القيم',
        data: countValues,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className="bg-white/10 rounded-xl p-4 text-white">
      <h2 className="text-lg mb-4 font-bold">📊 إحصائيات الأعمدة الرقمية</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default AnalyticsChart;
