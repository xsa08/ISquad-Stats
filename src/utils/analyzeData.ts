export interface TextColumnStats {
  column: string;
  uniqueCount: number;
  mostFrequent: string;
  frequency: number;
}

export interface NumericStats {
  mean: number;
  min: number;
  max: number;
  count: number;
}

export function analyzeData(data: any[]) {
  const numeric: Record<string, NumericStats> = {};
  const text: TextColumnStats[] = [];

  if (!Array.isArray(data) || data.length === 0) return { numeric, text };

  const sample = data[0];

  Object.keys(sample).forEach((key) => {
    const values = data.map((row) => row[key]);
    const numericValues = values.map((v) => parseFloat(v)).filter((v) => !isNaN(v));

    // إذا كانت قيم العمود أغلبها أرقام --> اعتبره رقمي
    if (numericValues.length >= values.length * 0.5) {
      const sum = numericValues.reduce((a, b) => a + b, 0);
      numeric[key] = {
        mean: parseFloat((sum / numericValues.length).toFixed(2)),
        min: Math.min(...numericValues),
        max: Math.max(...numericValues),
        count: numericValues.length
      };
    } else {
      // تحليل نصي
      const strings = values.map((v) => String(v).trim()).filter((v) => v !== '');
      const freqMap = new Map<string, number>();
      for (const val of strings) {
        freqMap.set(val, (freqMap.get(val) || 0) + 1);
      }

      const sorted = [...freqMap.entries()].sort((a, b) => b[1] - a[1]);
      if (sorted.length > 0) {
        text.push({
          column: key,
          uniqueCount: freqMap.size,
          mostFrequent: sorted[0][0],
          frequency: sorted[0][1],
        });
      }
    }
  });

  return { numeric, text };
}

