import React from 'react';

export interface TextColumnStats {
  column: string;
  uniqueCount: number;
  mostFrequent: string;
  frequency: number;
}

interface Props {
  data: TextColumnStats[];
}

const TextColumnAnalysis: React.FC<Props> = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-white/10 p-6 rounded-2xl shadow-md text-white">
      <h3 className="text-2xl font-semibold mb-4">📊 تحليل الأعمدة النصية</h3>
      <table className="w-full table-auto border-collapse text-left text-white">
        <thead>
          <tr className="border-b border-gray-500">
            <th className="p-2">العمود</th>
            <th className="p-2">عدد القيم الفريدة</th>
            <th className="p-2">الأكثر تكرارًا</th>
            <th className="p-2">عدد مرات التكرار</th>
          </tr>
        </thead>
        <tbody>
          {data.map((col) => (
            <tr key={col.column} className="border-b border-gray-800">
              <td className="p-2">{col.column}</td>
              <td className="p-2">{col.uniqueCount}</td>
              <td className="p-2">{col.mostFrequent}</td>
              <td className="p-2">{col.frequency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TextColumnAnalysis;
