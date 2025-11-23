export type SensorDataPoint = {
  timestamp: number;
  ax: number;
  ay: number;
  az: number;
  gx: number;
  gy: number;
  gz: number;
};

export type StatValue = {
  mean: number;
  peak: number;
};

export type Stats = {
  [key: string]: StatValue;
};

export const calculateStats = (
  data: SensorDataPoint[],
  keys: (keyof SensorDataPoint)[]
): Stats => {
  if (data.length === 0) {
    return keys.reduce((acc, key) => ({ ...acc, [key]: { mean: 0, peak: 0 } }), {});
  }

  const sums: { [key: string]: number } = keys.reduce((acc, key) => ({ ...acc, [key]: 0 }), {});
  const peaks: { [key: string]: number } = keys.reduce((acc, key) => ({ ...acc, [key]: 0 }), {});

  data.forEach((point) => {
    keys.forEach((key) => {
      const value = point[key] as number;
      if (typeof value === 'number' && !isNaN(value)) {
        sums[key] += value;
        if (Math.abs(value) > peaks[key]) {
          peaks[key] = Math.abs(value);
        }
      }
    });
  });

  const stats: Stats = {};
  keys.forEach((key) => {
    stats[key.toString()] = {
      mean: sums[key] / data.length,
      peak: peaks[key],
    };
  });

  return stats;
};

export const parseSensorData = (fileContent: string): SensorDataPoint[] | null => {
    const lines = fileContent.split('\n').filter(line => line.trim() !== '');
    if (lines.length < 2) {
      console.error("File content is too short.");
      return null;
    }

    const headers = lines[0].split(',').map(h => h.trim());
    const expectedHeaders = ['timestamp', 'ax', 'ay', 'az', 'gx', 'gy', 'gz'];
    
    if (!expectedHeaders.every(h => headers.includes(h))) {
      console.error("CSV must contain required headers: ", expectedHeaders.join(', '));
      return null;
    }

    return lines.slice(1).map(line => {
        const values = line.split(',');
        const point: any = {};
        headers.forEach((header, index) => {
            const value = parseFloat(values[index]);
            point[header] = isNaN(value) ? values[index] : value;
        });
        return point as SensorDataPoint;
    }).filter(p => p.timestamp && typeof p.timestamp === 'number');
};
