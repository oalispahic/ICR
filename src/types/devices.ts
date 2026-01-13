export type DeviceType = 'light' | 'climate' | 'entertainment' | 'appliance';

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  isOn: boolean;
  roomId: string;
  icon: string;
  brightness?: number;
  colorTemp?: 'warm' | 'neutral' | 'cool';
  temperature?: number;
  volume?: number;
  mode?: string;
  channel?: string;
  timer?: number;
  connected?: boolean;
  nowPlaying?: {
    title: string;
    artist: string;
  };
}

export interface Room {
  id: string;
  name: string;
  icon: string;
  deviceCount: number;
  activeDevices: number;
  temperature?: number;
  humidity?: number;
  image?: string;
}

export const deviceTypeColors: Record<DeviceType, string> = {
  light: 'bg-amber-400/20 text-amber-500',
  climate: 'bg-primary/20 text-primary',
  entertainment: 'bg-purple-400/20 text-purple-500',
  appliance: 'bg-orange-400/20 text-orange-500',
};

export const deviceTypeLabels: Record<DeviceType, string> = {
  light: 'Lights',
  climate: 'Climate',
  entertainment: 'Entertainment',
  appliance: 'Appliances',
};

export interface EnergyData {
  category: string;
  value: number;
  color: string;
}

export interface UsageStat {
  id: string;
  name: string;
  icon: string;
  currentUsage: number;
  unit: string;
  cost: number;
  trend: 'up' | 'down';
  change: number;
}