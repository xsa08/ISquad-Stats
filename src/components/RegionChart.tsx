'use client';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { useLanguage } from '../context/LanguageContext';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type Props = {
  data: any[]; // بيانات الملف المحلل
  regionKey: string; // اسم العمود الذي يمثل المنطقة
};

export default function RegionChart({ data, regionKey }: Props) {
  const { language } = useLanguage();

  // حساب عدد المنشآت حسب المنطقة
  const regionCounts: Record<string, number> = {};

  data.forEach((row) => {
    const region = row[regionKey];
    if (region) {
      regionCounts[region] = (regionCounts[region] || 0) + 1;
    }
  });

  const labels = Object.keys(regionCounts);
  const values = Object.values(regionCounts);

  const chartData = {
    labels,
    datasets: [
      {
        label: language === 'ar' ? 'عدد المنشآت' : 'Number of Establishments',
        data: values,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
      },
      y: {
        ticks: {
          color: 'white',
        },
      },
    },
  };

  return (
    <div className="bg-white/5 p-4 rounded-xl mt-10 shadow-lg">
      <h2 className="text-white text-lg mb-4">
        {language === 'ar' ? 'عدد المنشآت حسب المنطقة' : 'Establishments by Region'}
      </h2>
      <Bar data={chartData} options={options} />
    </div>
  );
}
