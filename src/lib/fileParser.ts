import * as XLSX from 'xlsx';
import Papa from 'papaparse';

export const detectFileType = (file: File): 'json' | 'csv' | 'excel' | 'unknown' => {
  if (file.name.endsWith('.json')) return 'json';
  if (file.name.endsWith('.csv')) return 'csv';
  if (file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) return 'excel';
  return 'unknown';
};

export const parseFile = async (file: File): Promise<any[]> => {
  const fileType = detectFileType(file);

  if (fileType === 'json') {
    const text = await file.text();
    const json = JSON.parse(text);
    return Array.isArray(json) ? json : [json];
  }

  if (fileType === 'csv') {
    const text = await file.text();
    const result = Papa.parse(text, { header: true });
    return result.data as any[];
  }

  if (fileType === 'excel') {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    return XLSX.utils.sheet_to_json(sheet);
  }

  throw new Error('صيغة الملف غير مدعومة');
};

