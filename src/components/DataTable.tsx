'use client';
import React from 'react';

interface Props {
  data: Record<string, any>[];
    language: 'ar' | 'en'; // ✅ أضف هذا السطر

}



const DataTable: React.FC<Props> = ({ data }) => {
  if (!data || data.length === 0) return <div className="text-white mt-6">📭 لا توجد بيانات لعرضها</div>;

  const headers = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto mt-10 rounded-xl border border-white/20 backdrop-blur-md bg-white/5">
      <table className="min-w-full text-sm text-white border-collapse">
        <thead>
          <tr className="bg-white/10">
            {headers.map((header) => (
              <th key={header} className="px-4 py-2 border border-white/10 font-semibold">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 20).map((row, i) => (
            <tr key={i} className="hover:bg-white/10">
              {headers.map((header) => (
                <td key={header} className="px-4 py-2 border border-white/10">
                  {String(row[header])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
