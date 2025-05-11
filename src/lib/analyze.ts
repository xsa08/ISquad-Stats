export const analyzeData = (rows: any[]) => {
  const summary: Record<string, any> = {};

  const numericKeys = Object.keys(rows[0]).filter((key) =>
    rows.every(row => !isNaN(parseFloat(row[key])))
  );

  for (const key of numericKeys) {
    const values = rows.map(r => parseFloat(r[key])).filter(v => !isNaN(v));
    summary[key] = {
      mean: (values.reduce((sum, v) => sum + v, 0) / values.length).toFixed(2),
      min: Math.min(...values),
      max: Math.max(...values),
      count: values.length,
    };
  }

  return summary;
};
