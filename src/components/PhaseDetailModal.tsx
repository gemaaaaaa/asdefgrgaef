import React from 'react';
import { Line } from 'react-chartjs-2';
import { X } from 'lucide-react';
import { PhaseType, VoltageData } from '../types';
import { commonOptions, metricOptions } from '../config/chartConfig';
import { createChartData, getMetricsData } from '../utils/chartUtils';

interface ModalProps {
  phase: PhaseType;
  onClose: () => void;
  data: VoltageData[];
  color: string;
}

export const PhaseDetailModal: React.FC<ModalProps> = ({ phase, onClose, data, color }) => {
  if (!phase) return null;

  const metrics = getMetricsData(data);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
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