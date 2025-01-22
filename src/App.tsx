import React, { useState } from 'react';
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
import { MenuType, PhaseType } from './types';
import { Navigation } from './components/Navigation';
import { GraphView } from './components/views/GraphView';
import { TableView } from './components/views/TableView';
import { SettingsView } from './components/views/SettingsView';

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

function App() {
  const [activeMenu, setActiveMenu] = useState<MenuType>('graph');
  const [selectedPhase, setSelectedPhase] = useState<PhaseType>(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeMenu === 'graph' && <GraphView selectedPhase={selectedPhase} setSelectedPhase={setSelectedPhase} />}
        {activeMenu === 'table' && <TableView />}
        {activeMenu === 'settings' && <SettingsView />}
      </div>
    </div>
  );
}

export default App;