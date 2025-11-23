
export type NoiseDataPoint = {
  timestamp: number;
  noiseLevel: number;
};

export type NoiseStats = {
  mean: number;
  peak: number;
  min: number;
};

export const calculateNoiseStats = (data: NoiseDataPoint[]): NoiseStats => {
  if (data.length === 0) {
    return { mean: 0, peak: 0, min: 0 };
  }

  let sum = 0;
  let peak = -Infinity;
  let min = Infinity;

  data.forEach((point) => {
    const value = point.noiseLevel;
    if (typeof value === 'number' && !isNaN(value)) {
      sum += value;
      if (value > peak) {
        peak = value;
      }
      if (value < min) {
        min = value;
      }
    }
  });

  return {
    mean: sum / data.length,
    peak,
    min,
  };
};

export const parseNoiseData = (fileContent: string): NoiseDataPoint[] | null => {
    const lines = fileContent.split('\n').filter(line => line.trim() !== '');
    if (lines.length < 2) {
      console.error("File content is too short.");
      return null;
    }

    const headers = lines[0].split(',').map(h => h.trim());
    const expectedHeaders = ['timestamp', 'noise_level'];
    
    const timestampIndex = headers.indexOf('timestamp');
    const noiseLevelIndex = headers.indexOf('noise_level');

    if (timestampIndex === -1 || noiseLevelIndex === -1) {
      console.error("CSV must contain required headers: 'timestamp' and 'noise_level'");
      return null;
    }

    return lines.slice(1).map(line => {
        const values = line.split(',');
        const timestamp = parseFloat(values[timestampIndex]);
        const noiseLevel = parseFloat(values[noiseLevelIndex]);

        if (isNaN(timestamp) || isNaN(noiseLevel)) {
            return null;
        }

        return { timestamp, noiseLevel };
    }).filter((p): p is NoiseDataPoint => p !== null);
};
