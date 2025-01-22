// Type definitions for the application
export type MenuType = 'graph' | 'table' | 'settings';
export type PhaseType = 'R' | 'S' | 'T' | null;

export interface VoltageData {
  Tegangan: number;
  Time: string;
}

export interface MetricData {
  value: number;
  Time: string;
}

export interface ChartOptions {
  responsive: boolean;
  maintainAspectRatio: boolean;
  scales: {
    y: {
      min: number;
      max: number;
      ticks: {
        stepSize: number;
      };
    };
  };
  animation: {
    duration: number;
  };
}