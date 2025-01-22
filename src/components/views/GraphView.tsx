import React from 'react';
import { Line } from 'react-chartjs-2';
import { PhaseType } from '../../types';
import { commonOptions } from '../../config/chartConfig';
import { createChartData } from '../../utils/chartUtils';
import { phaseRData, phaseSData, phaseTData } from '../../data/phaseData';
import { PhaseDetailModal } from '../PhaseDetailModal';

interface GraphViewProps {
  selectedPhase: PhaseType;
  setSelectedPhase: (phase: PhaseType) => void;
}

export const GraphView: React.FC<GraphViewProps> = ({ selectedPhase, setSelectedPhase }) => {
  return (
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
};