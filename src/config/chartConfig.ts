import { ChartOptions } from '../types';

// Common options for all charts
export const commonOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      min: 200,
      max: 240,
      ticks: {
        stepSize: 5
      }
    }
  },
  animation: {
    duration: 0
  }
};

// Specific options for different metrics
export const metricOptions = {
  current: {
    ...commonOptions,
    scales: {
      y: {
        min: 0,
        max: 20,
        ticks: { stepSize: 2 }
      }
    }
  },
  power: {
    ...commonOptions,
    scales: {
      y: {
        min: 1500,
        max: 3000,
        ticks: { stepSize: 300 }
      }
    }
  },
  energy: {
    ...commonOptions,
    scales: {
      y: {
        min: 0,
        max: 3,
        ticks: { stepSize: 0.5 }
      }
    }
  },
  frequency: {
    ...commonOptions,
    scales: {
      y: {
        min: 48,
        max: 52,
        ticks: { stepSize: 0.5 }
      }
    }
  },
  powerFactor: {
    ...commonOptions,
    scales: {
      y: {
        min: 0.8,
        max: 1,
        ticks: { stepSize: 0.05 }
      }
    }
  }
};