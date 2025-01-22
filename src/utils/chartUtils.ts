import { VoltageData, MetricData } from '../types';

// Generate random metric data
export const generateMetricData = (baseValue: number, variance: number, times: string[]): MetricData[] => {
  return times.map((time) => ({
    value: baseValue + (Math.random() * variance * 2 - variance),
    Time: time
  }));
};

// Get all metrics data for a phase
export const getMetricsData = (phaseData: VoltageData[]) => {
  const times = phaseData.map(item => item.Time);
  return {
    current: generateMetricData(10, 2, times),      // Amps, around 10A ±2
    power: generateMetricData(2200, 200, times),    // Watts, around 2200W ±200
    energy: generateMetricData(1.5, 0.3, times),    // kWh, around 1.5 ±0.3
    frequency: generateMetricData(50, 0.5, times),  // Hz, around 50Hz ±0.5
    powerFactor: generateMetricData(0.92, 0.08, times) // Range 0.8-1
  };
};

// Create chart data configuration
export const createChartData = (data: VoltageData[] | MetricData[], label: string, color: string) => ({
  labels: data.map(item => item.Time),
  datasets: [{
    label,
    data: data.map(item => 'Tegangan' in item ? item.Tegangan : item.value),
    borderColor: color,
    backgroundColor: color,
    tension: 0.4,
  }]
});