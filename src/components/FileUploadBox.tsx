'use client';

import { useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { analyzeData, TextColumnStats } from '../utils/analyzeData';
import DataTable from './DataTable';
import AnalyticsChart from './AnalyticsChart';
import TextAnalyticsChart from './TextAnalyticsChart';
import { Table, BarChart3, Type } from 'lucide-react';
import jsPDF from 'jspdf';
// @ts-ignore
import domtoimage from 'dom-to-image';

export default function FileUploadBox() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { language } = useLanguage();
  const [fileName, setFileName] = useState('');
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState('');
  const [textStats, setTextStats] = useState<TextColumnStats[]>([]);
  const [numericStats, setNumericStats] = useState<Record<string, { mean: number; min: number; max: number; count: number }>>({});
  const [rawData, setRawData] = useState<any[]>([]);

  const handleClick = () => fileInputRef.current?.click();

  const handleDownloadPDF = async () => {
    const element = document.getElementById('report-content');
    if (!element) return;

    domtoimage.toPng(element).then((dataUrl: string) => {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (img.height * pdfWidth) / img.width;
        pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${fileName || 'InsightHub_Report'}.pdf`);
      };
    }).catch((err: unknown)  => {
      console.error('خطأ في توليد الصورة:', err);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setUploaded(true);
    setError('');

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result;
        let data: any[] = [];

        if (file.name.endsWith('.xlsx')) {
          const workbook = XLSX.read(content, { type: 'binary' });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          data = XLSX.utils.sheet_to_json(sheet, { defval: '' }) as any[];
        } else if (file.name.endsWith('.csv')) {
          const result = Papa.parse(content as string, { header: true });
          data = result.data as any[];
        } else if (file.name.endsWith('.json')) {
          const json = JSON.parse(content as string);
          data = Array.isArray(json) ? json : [json];
        }

        if (!data || data.length === 0) {
          setError(language === 'ar' ? '📂 الملف فارغ أو غير صالح.' : 'File is empty or invalid.');
          return;
        }

        setRawData(data);
        const { numeric, text } = analyzeData(data);
        setNumericStats(numeric);
        setTextStats(text);

        localStorage.setItem('report_data', JSON.stringify(data));
        localStorage.setItem('report_numeric', JSON.stringify(numeric));
        localStorage.setItem('report_text', JSON.stringify(text));
        localStorage.setItem('report_fileName', file.name);
        localStorage.setItem('report_lang', language);
      } catch (err) {
        setError(language === 'ar' ? 'حدث خطأ أثناء قراءة الملف' : 'Error parsing file');
      }
    };

    if (file.name.endsWith('.xlsx')) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main className="flex-grow">
        <div className="w-[90%] max-w-xl mx-auto mt-16 text-center">
          <div className="relative z-10">
            <div className="text-white text-lg mb-6 font-medium flex items-center justify-center gap-2">
              <span className="text-yellow-400 text-2xl"></span>
              {language === 'ar'
                ? '✨! قم برفع ملف  للحصول على تحليلات تفاعلية وذكية'
                : ' Upload file to get interactive and smart analytics!✨'}
            </div>
          </div>

          <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-8 shadow-lg border border-white/20">
            <div
              onClick={handleClick}
              className="cursor-pointer py-10 px-4 border-2 border-dashed border-white/30 rounded-xl hover:border-white transition"
            >
              <p className="text-white opacity-80">
                {language === 'ar' ? 'انقر لاختيار الملف' : 'Click to select file'}
              </p>
              <p className="text-sm text-gray-300 mt-2">(.json, .xlsx, .csv)</p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json,.xlsx,.csv"
              onChange={handleFileChange}
              hidden
            />

            {uploaded && (
              <div className="mt-4 text-green-300">
                ✅ {language === 'ar' ? 'تم رفع الملف:' : 'Uploaded:'}{' '}
                <span className="underline">{fileName}</span>
              </div>
            )}

            {error && (
              <div className="mt-4 text-red-400">
                ⚠️ {error}
              </div>
            )}
          </div>
        </div>

        {rawData.length > 0 && (
          <div className="mt-10 w-[90%] max-w-5xl mx-auto space-y-16" id="report-content">
            <div className="relative z-10">
              <h3 className="text-white text-2xl font-bold mb-4 flex items-center gap-3 z-10 relative">
                <Table className="w-6 h-6 text-white" />
                {language === 'ar' ? ' جدول البيانات' : ' Data Table'}
              </h3>
              <DataTable data={rawData} language={language} />
            </div>

             {/* 🔵 تحليل القيم الرقمية */}
    {Object.keys(numericStats).length > 0 && (
      <div className="relative z-10"  id="report-content">
        <h3 className="text-white text-2xl font-bold mb-4 flex items-center gap-3 z-10 relative">
          <BarChart3 className="w-6 h-6 text-white" />
          {language === 'ar' ? ' تحليل القيم الرقمية' : ' Numeric Column Analysis'}
        </h3>
        <AnalyticsChart data={numericStats} language={language} />
        <p className="text-sm text-white/80 leading-relaxed mt-2 max-w-3xl mx-auto text-center">
          {language === 'ar'
            ? '.يعرض هذا الرسم الإحصائي أهم القيم الرقمية الموجودة في ملف البيانات مثل المتوسط، والحد الأدنى والأقصى لكل عمود رقمي. يساعدك على فهم التوزيع العام وتحليل الاتجاهات بسهولة'
            : 'This chart presents key statistics such as the mean, minimum, and maximum for each numeric column in your dataset. It helps you quickly understand data distribution and spot trends.'}
        </p>
        <p className="text-xs text-white/70 italic mt-1 max-w-3xl mx-auto text-center">
          {language === 'ar'
            ? '.🔍 هذا الرسم تفاعلي: مرّر المؤشر على الأعمدة للاطلاع على تفاصيل مثل المتوسط والحد الأدنى والأقصى لكل عمود رقمي في بياناتك'
            : ' This is an interactive chart: Hover over the bars to view details such as the mean, minimum, and maximum for each numeric column 🔍.'}
        </p>
      </div>
    )}

         {/* 🟣 تحليل القيم النصية */}
    {textStats.length > 0 && (
      <div className="relative z-10"  id="report-content">
        <h3 className="text-white text-2xl font-bold mb-4 flex items-center gap-3 z-10 relative">
          <Type className="w-6 h-6 text-white" />
          {language === 'ar' ? ' تحليل القيم النصية' : ' Text Column Analysis'}
        </h3>
        <TextAnalyticsChart data={textStats} language={language} />
        <p className="text-sm text-white/80 leading-relaxed mt-2 max-w-3xl mx-auto text-center">
          {language === 'ar'
            ? ' .يعرض هذا الرسم القيم النصية الأكثر تكرارًا في البيانات، مما يساعد في اكتشاف الأنماط أو الفئات المهيمنة داخل الحقول النصية'
            : 'This chart shows the most frequent text values in your dataset, helping identify dominant patterns or common categories in text fields.'}
        </p>
        <p className="text-xs text-white/70 italic mt-1 max-w-3xl mx-auto text-center">
          {language === 'ar'
            ? '.🧠 الرسم تفاعلي: حرّك المؤشر فوق الأعمدة لاستكشاف القيم النصية الأكثر شيوعًا وعدد مرات تكرارها'
            : ' Interactive chart: Hover over the bars to explore the most frequent text values and their occurrence counts 🧠.'}
        </p>
      </div>
    )}

           
          </div>
        )}
      </main>


    </div>
  );
}
