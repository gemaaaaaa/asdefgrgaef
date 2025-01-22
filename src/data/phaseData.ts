import { VoltageData } from '../types';

// Static data for each phase with updated time format
export const phaseRData: VoltageData[] = [
  { Tegangan: 215, Time: "04:10 WIB" },
  { Tegangan: 218, Time: "04:11 WIB" },
  // ... (rest of phaseRData)
];

export const phaseSData: VoltageData[] = [
  { Tegangan: 211, Time: "05:00 WIB" },
  { Tegangan: 213, Time: "05:01 WIB" },
  // ... (rest of phaseSData)
];

export const phaseTData: VoltageData[] = [
  { Tegangan: 210, Time: "06:30 WIB" },
  { Tegangan: 212, Time: "06:31 WIB" },
  // ... (rest of phaseTData)
];