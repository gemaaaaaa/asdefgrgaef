import React from 'react';
import { phaseRData, phaseSData, phaseTData } from '../../data/phaseData';

export const TableView: React.FC = () => {
  return (
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
};