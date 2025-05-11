'use client';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface Stats {
  mean: number;
  min: number;
  max: number;
  count: number;
}

interface AnalyticsChartProps {
  data: Record<string, Stats>;
  language: 'ar' | 'en';
}

export default function AnalyticsChart({ data, language }: AnalyticsChartProps) {
  const labels = Object.keys(data);

  const dataset = {
    labels,
    datasets: [
      {
        label: language === 'ar' ? 'المتوسط' : 'Mean',
        data: labels.map(key => data[key].mean),
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
      {
        label: language === 'ar' ? 'الحد الأدنى' : 'Min',
        data: labels.map(key => data[key].min),
        backgroundColor: 'rgba(255,99,132,0.6)',
      },
      {
        label: language === 'ar' ? 'الحد الأقصى' : 'Max',
        data: labels.map(key => data[key].max),
        backgroundColor: 'rgba(255,206,86,0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white',
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.raw}`;
          }
        },
        titleColor: 'white',
        bodyColor: 'white',
        backgroundColor: '#1f2937', // Tailwind's gray-800
      }
    },
    scales: {
      x: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
      y: {
        ticks: { color: 'white' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
    },
  };

  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md">
      <Bar data={dataset} options={options} />
    </div>
  );
}
