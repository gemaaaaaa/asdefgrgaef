import React from 'react';
import { Activity, BarChart2, Settings, Table as TableIcon } from 'lucide-react';
import { MenuType } from '../types';

interface NavigationProps {
  activeMenu: MenuType;
  setActiveMenu: (menu: MenuType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeMenu, setActiveMenu }) => {
  return (
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
  );
};