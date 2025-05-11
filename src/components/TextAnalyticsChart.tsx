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

interface TextColumnStats {
  column: string;
  uniqueCount: number;
  mostFrequent: string;
  frequency: number;
}

interface Props {
  data: TextColumnStats[];
  language: 'ar' | 'en';
}

export default function TextAnalyticsChart({ data, language }: Props) {
  const labels = data.map(d => d.column);

  const dataset = {
    labels,
    datasets: [
      {
        label: language === 'ar' ? 'عدد مرات التكرار' : 'Frequency Count',
        data: data.map(d => d.frequency),
        backgroundColor: 'rgba(153,102,255,0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white',
          font: { size: 14 }
        }
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return language === 'ar'
              ? `التكرار: ${context.raw}`
              : `Frequency: ${context.raw}`;
          }
        },
        titleColor: 'white',
        bodyColor: 'white',
        backgroundColor: '#1f2937', // Tailwind gray-800
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
