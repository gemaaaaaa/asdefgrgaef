import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Activity, BarChart2, Table as TableIcon, Settings, Download, X } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Static data for each phase
const phaseRData = [
  { Tegangan: 215, Time: "4:10 AM UTC +7" },
  { Tegangan: 218, Time: "4:11 AM UTC +7" },
  { Tegangan: 220, Time: "4:12 AM UTC +7" },
  { Tegangan: 222, Time: "4:13 AM UTC +7" },
  { Tegangan: 225, Time: "4:14 AM UTC +7" },
  { Tegangan: 227, Time: "4:15 AM UTC +7" },
  { Tegangan: 229, Time: "4:16 AM UTC +7" },
  { Tegangan: 230, Time: "4:17 AM UTC +7" },
  { Tegangan: 228, Time: "4:18 AM UTC +7" },
  { Tegangan: 226, Time: "4:19 AM UTC +7" },
  { Tegangan: 224, Time: "4:20 AM UTC +7" },
  { Tegangan: 221, Time: "4:21 AM UTC +7" },
  { Tegangan: 219, Time: "4:22 AM UTC +7" },
  { Tegangan: 217, Time: "4:23 AM UTC +7" },
  { Tegangan: 214, Time: "4:24 AM UTC +7" },
  { Tegangan: 212, Time: "4:25 AM UTC +7" },
  { Tegangan: 210, Time: "4:26 AM UTC +7" },
  { Tegangan: 213, Time: "4:27 AM UTC +7" },
  { Tegangan: 216, Time: "4:28 AM UTC +7" },
  { Tegangan: 219, Time: "4:29 AM UTC +7" }
];

const phaseSData = [
  { Tegangan: 211, Time: "5:00 AM UTC +7" },
  { Tegangan: 213, Time: "5:01 AM UTC +7" },
  { Tegangan: 215, Time: "5:02 AM UTC +7" },
  { Tegangan: 217, Time: "5:03 AM UTC +7" },
  { Tegangan: 219, Time: "5:04 AM UTC +7" },
  { Tegangan: 221, Time: "5:05 AM UTC +7" },
  { Tegangan: 223, Time: "5:06 AM UTC +7" },
  { Tegangan: 225, Time: "5:07 AM UTC +7" },
  { Tegangan: 227, Time: "5:08 AM UTC +7" },
  { Tegangan: 229, Time: "5:09 AM UTC +7" },
  { Tegangan: 230, Time: "5:10 AM UTC +7" },
  { Tegangan: 228, Time: "5:11 AM UTC +7" },
  { Tegangan: 226, Time: "5:12 AM UTC +7" },
  { Tegangan: 224, Time: "5:13 AM UTC +7" },
  { Tegangan: 222, Time: "5:14 AM UTC +7" },
  { Tegangan: 220, Time: "5:15 AM UTC +7" },
  { Tegangan: 218, Time: "5:16 AM UTC +7" },
  { Tegangan: 216, Time: "5:17 AM UTC +7" },
  { Tegangan: 214, Time: "5:18 AM UTC +7" },
  { Tegangan: 212, Time: "5:19 AM UTC +7" }
];

const phaseTData = [
  { Tegangan: 210, Time: "6:30 AM UTC +7" },
  { Tegangan: 212, Time: "6:31 AM UTC +7" },
  { Tegangan: 214, Time: "6:32 AM UTC +7" },
  { Tegangan: 216, Time: "6:33 AM UTC +7" },
  { Tegangan: 218, Time: "6:34 AM UTC +7" },
  { Tegangan: 220, Time: "6:35 AM UTC +7" },
  { Tegangan: 222, Time: "6:36 AM UTC +7" },
  { Tegangan: 224, Time: "6:37 AM UTC +7" },
  { Tegangan: 226, Time: "6:38 AM UTC +7" },
  { Tegangan: 228, Time: "6:39 AM UTC +7" },
  { Tegangan: 230, Time: "6:40 AM UTC +7" },
  { Tegangan: 229, Time: "6:41 AM UTC +7" },
  { Tegangan: 227, Time: "6:42 AM UTC +7" },
  { Tegangan: 225, Time: "6:43 AM UTC +7" },
  { Tegangan: 223, Time: "6:44 AM UTC +7" },
  { Tegangan: 221, Time: "6:45 AM UTC +7" },
  { Tegangan: 219, Time: "6:46 AM UTC +7" },
  { Tegangan: 217, Time: "6:47 AM UTC +7" },
  { Tegangan: 215, Time: "6:48 AM UTC +7" },
  { Tegangan: 213, Time: "6:49 AM UTC +7" }
];

// Additional metrics data (sample data following similar pattern)
const generateMetricData = (baseValue: number, variance: number, times: string[]) => {
  return times.map((time) => ({
    value: baseValue + (Math.random() * variance * 2 - variance),
    Time: time
  }));
};

const getMetricsData = (phaseData: typeof phaseRData) => {
  const times = phaseData.map(item => item.Time);
  return {
    current: generateMetricData(10, 2, times),      // Amps, around 10A ±2
    power: generateMetricData(2200, 200, times),    // Watts, around 2200W ±200
    energy: generateMetricData(1.5, 0.3, times),    // kWh, around 1.5 ±0.3
    frequency: generateMetricData(50, 0.5, times),  // Hz, around 50Hz ±0.5
    powerFactor: generateMetricData(0.92, 0.08, times) // Range 0.8-1
  };
};

// Common options for all charts
const commonOptions = {
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
const metricOptions = {
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

// Utility function to create chart data
const createChartData = (data: any[], label: string, color: string) => ({
  labels: data.map(item => item.Time),
  datasets: [{
    label,
    data: data.map(item => typeof item.Tegangan !== 'undefined' ? item.Tegangan : item.value),
    borderColor: color,
    backgroundColor: color,
    tension: 0.4,
  }]
});

type MenuType = 'graph' | 'table' | 'settings';
type PhaseType = 'R' | 'S' | 'T' | null;

interface ModalProps {
  phase: PhaseType;
  onClose: () => void;
  data: typeof phaseRData;
  color: string;
}

const PhaseDetailModal: React.FC<ModalProps> = ({ phase, onClose, data, color }) => {
  if (!phase) return null;

  const metrics = getMetricsData(data);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Detail Fasa {phase}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Voltage Graph */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Tegangan (V)</h3>
              <div className="h-[300px]">
                <Line
                  data={createChartData(data, 'Voltage (V)', color)}
                  options={commonOptions}
                />
              </div>
            </div>

            {/* Current Graph */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Arus (A)</h3>
              <div className="h-[300px]">
                <Line
                  data={createChartData(metrics.current, 'Current (A)', color)}
                  options={metricOptions.current}
                />
              </div>
            </div>

            {/* Power Graph */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Daya (W)</h3>
              <div className="h-[300px]">
                <Line
                  data={createChartData(metrics.power, 'Power (W)', color)}
                  options={metricOptions.power}
                />
              </div>
            </div>

            {/* Energy Usage Graph */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Penggunaan Daya (kWh)</h3>
              <div className="h-[300px]">
                <Line
                  data={createChartData(metrics.energy, 'Energy (kWh)', color)}
                  options={metricOptions.energy}
                />
              </div>
            </div>

            {/* Frequency Graph */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Frekuensi (Hz)</h3>
              <div className="h-[300px]">
                <Line
                  data={createChartData(metrics.frequency, 'Frequency (Hz)', color)}
                  options={metricOptions.frequency}
                />
              </div>
            </div>

            {/* Power Factor Graph */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Faktor Daya</h3>
              <div className="h-[300px]">
                <Line
                  data={createChartData(metrics.powerFactor, 'Power Factor', color)}
                  options={metricOptions.powerFactor}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [activeMenu, setActiveMenu] = useState<MenuType>('graph');
  const [selectedPhase, setSelectedPhase] = useState<PhaseType>(null);

  const renderGraphView = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Phase R */}
      <div 
        className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setSelectedPhase('R')}
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Fasa R</h2>
        <div className="h-[300px]">
          <Line 
            data={createChartData(phaseRData, 'Voltage (V)', '#ef4444')} 
            options={{
              ...commonOptions,
              plugins: {
                title: {
                  display: true,
                  text: `Current: ${phaseRData[phaseRData.length - 1].Tegangan}V`
                }
              }
            }}
          />
        </div>
      </div>

      {/* Phase S */}
      <div 
        className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setSelectedPhase('S')}
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Fasa S</h2>
        <div className="h-[300px]">
          <Line 
            data={createChartData(phaseSData, 'Voltage (V)', '#3b82f6')} 
            options={{
              ...commonOptions,
              plugins: {
                title: {
                  display: true,
                  text: `Current: ${phaseSData[phaseSData.length - 1].Tegangan}V`
                }
              }
            }}
          />
        </div>
      </div>

      {/* Phase T */}
      <div 
        className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setSelectedPhase('T')}
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Fasa T</h2>
        <div className="h-[300px]">
          <Line 
            data={createChartData(phaseTData, 'Voltage (V)', '#22c55e')} 
            options={{
              ...commonOptions,
              plugins: {
                title: {
                  display: true,
                  text: `Current: ${phaseTData[phaseTData.length - 1].Tegangan}V`
                }
              }
            }}
          />
        </div>
      </div>

      {/* Phase Detail Modal */}
      {selectedPhase && (
        <PhaseDetailModal
          phase={selectedPhase}
          onClose={() => setSelectedPhase(null)}
          data={selectedPhase === 'R' ? phaseRData : selectedPhase === 'S' ? phaseSData : phaseTData}
          color={selectedPhase === 'R' ? '#ef4444' : selectedPhase === 'S' ? '#3b82f6' : '#22c55e'}
        />
      )}
    </div>
  );

  const renderTableView = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { title: 'Fasa R', data: phaseRData, color: 'text-red-500' },
        { title: 'Fasa S', data: phaseSData, color: 'text-blue-500' },
        { title: 'Fasa T', data: phaseTData, color: 'text-green-500' }
      ].map((phase, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-md">
          <h2 className={`text-lg font-semibold mb-4 ${phase.color}`}>{phase.title}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Time</th>
                  <th className="px-4 py-2 text-left">Voltage (V)</th>
                </tr>
              </thead>
              <tbody>
                {phase.data.map((item, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-4 py-2">{item.Time}</td>
                    <td className="px-4 py-2">{item.Tegangan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSettingsView = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Data Export Settings</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-medium text-gray-900">Download All Data</h3>
            <p className="text-sm text-gray-500">Export all voltage data as CSV file</p>
          </div>
          <button
            onClick={downloadCSV}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download CSV
          </button>
        </div>
      </div>
    </div>
  );

  const downloadCSV = () => {
    const headers = ['Time', 'Phase R (V)', 'Phase S (V)', 'Phase T (V)'];
    const maxLength = Math.max(phaseRData.length, phaseSData.length, phaseTData.length);
    const csvData = [];

    for (let i = 0; i < maxLength; i++) {
      const row = [
        phaseRData[i]?.Time || '',
        phaseRData[i]?.Tegangan || '',
        phaseSData[i]?.Time || '',
        phaseSData[i]?.Tegangan || '',
        phaseTData[i]?.Time || '',
        phaseTData[i]?.Tegangan || '',
      ];
      csvData.push(row.join(','));
    }
    
    const csvContent = [headers.join(','), ...csvData].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'voltage_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with Navigation */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">IoT Voltage Monitoring</h1>
            </div>
            <nav className="flex space-x-4">
              <button
                onClick={() => setActiveMenu('graph')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeMenu === 'graph'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BarChart2 className="w-5 h-5" />
                Tampilan Grafik
              </button>
              <button
                onClick={() => setActiveMenu('table')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeMenu === 'table'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <TableIcon className="w-5 h-5" />
                Tampilan Table
              </button>
              <button
                onClick={() => setActiveMenu('settings')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeMenu === 'settings'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Settings className="w-5 h-5" />
                Pengaturan
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeMenu === 'graph' && renderGraphView()}
        {activeMenu === 'table' && renderTableView()}
        {activeMenu === 'settings' && renderSettingsView()}
      </div>
    </div>
  );
}

export default App;