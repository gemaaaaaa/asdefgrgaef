import React from 'react';
import { Download } from 'lucide-react';
import { phaseRData, phaseSData, phaseTData } from '../../data/phaseData';

export const SettingsView: React.FC = () => {
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
};