import { useState } from 'react';
import { Device, Room } from '@/types/devices';

const initialRooms: Room[] = [
  { id: 'living', name: 'Living Room', icon: 'Sofa', deviceCount: 8, activeDevices: 4, temperature: 22, humidity: 45 },
  { id: 'bedroom', name: 'Bedroom', icon: 'Bed', deviceCount: 5, activeDevices: 1, temperature: 20, humidity: 50 },
  { id: 'kitchen', name: 'Kitchen', icon: 'ChefHat', deviceCount: 7, activeDevices: 3, temperature: 23, humidity: 55 },
  { id: 'bathroom', name: 'Bathroom', icon: 'Bath', deviceCount: 4, activeDevices: 2, temperature: 24, humidity: 70 },
  { id: 'garage', name: 'Garage', icon: 'Car', deviceCount: 3, activeDevices: 0, temperature: 18, humidity: 40 },
  { id: 'office', name: 'Office', icon: 'Monitor', deviceCount: 6, activeDevices: 2, temperature: 21, humidity: 42 },
];

const initialDevices: Device[] = [
  // Living Room
  { id: 'l1', name: 'Main Light', type: 'light', isOn: true, roomId: 'living', icon: 'Lightbulb', brightness: 80, colorTemp: 'warm' },
  { id: 'l2', name: 'Accent Lights', type: 'light', isOn: true, roomId: 'living', icon: 'Lamp', brightness: 60, colorTemp: 'neutral' },
  { id: 'l3', name: 'Floor Lamp', type: 'light', isOn: false, roomId: 'living', icon: 'LampDesk', brightness: 100, colorTemp: 'warm' },
  { id: 'c1', name: 'AC Unit', type: 'climate', isOn: true, roomId: 'living', icon: 'Snowflake', temperature: 22, mode: 'cool' },
  { id: 'e1', name: 'Smart TV', type: 'entertainment', isOn: true, roomId: 'living', icon: 'Tv', volume: 35, channel: 'Netflix' },
  { id: 'e2', name: 'Soundbar', type: 'entertainment', isOn: true, roomId: 'living', icon: 'Speaker', volume: 40 },
  { id: 'a1', name: 'Air Purifier', type: 'appliance', isOn: false, roomId: 'living', icon: 'Wind', mode: 'auto' },
  { id: 'a2', name: 'Smart Blinds', type: 'appliance', isOn: false, roomId: 'living', icon: 'PanelTop', mode: 'closed' },
  
  // Bedroom
  { id: 'l4', name: 'Ceiling Light', type: 'light', isOn: false, roomId: 'bedroom', icon: 'Lightbulb', brightness: 70, colorTemp: 'warm' },
  { id: 'l5', name: 'Bedside Lamp', type: 'light', isOn: true, roomId: 'bedroom', icon: 'Lamp', brightness: 30, colorTemp: 'warm' },
  { id: 'c2', name: 'Heater', type: 'climate', isOn: false, roomId: 'bedroom', icon: 'Flame', temperature: 20, mode: 'heat' },
  { id: 'a3', name: 'Humidifier', type: 'appliance', isOn: false, roomId: 'bedroom', icon: 'Droplets', mode: 'auto' },
  { id: 'e3', name: 'Bedroom TV', type: 'entertainment', isOn: false, roomId: 'bedroom', icon: 'Tv', volume: 20 },
  
  // Kitchen
  { id: 'l6', name: 'Kitchen Lights', type: 'light', isOn: true, roomId: 'kitchen', icon: 'Lightbulb', brightness: 100, colorTemp: 'cool' },
  { id: 'l7', name: 'Under Cabinet', type: 'light', isOn: true, roomId: 'kitchen', icon: 'LampDesk', brightness: 80, colorTemp: 'neutral' },
  { id: 'c3', name: 'Ventilation Fan', type: 'climate', isOn: true, roomId: 'kitchen', icon: 'Fan', mode: 'medium' },
  { id: 'a4', name: 'Coffee Maker', type: 'appliance', isOn: false, roomId: 'kitchen', icon: 'Coffee', timer: 0 },
  { id: 'a5', name: 'Smart Oven', type: 'appliance', isOn: false, roomId: 'kitchen', icon: 'Utensils', temperature: 180 },
  { id: 'a6', name: 'Dishwasher', type: 'appliance', isOn: false, roomId: 'kitchen', icon: 'Waves', mode: 'eco' },
  { id: 'a7', name: 'Smart Fridge', type: 'appliance', isOn: true, roomId: 'kitchen', icon: 'Refrigerator', temperature: 4 },
  
  // Bathroom
  { id: 'l8', name: 'Bathroom Light', type: 'light', isOn: true, roomId: 'bathroom', icon: 'Lightbulb', brightness: 100, colorTemp: 'cool' },
  { id: 'l9', name: 'Mirror Light', type: 'light', isOn: true, roomId: 'bathroom', icon: 'Lamp', brightness: 90, colorTemp: 'neutral' },
  { id: 'c4', name: 'Exhaust Fan', type: 'climate', isOn: false, roomId: 'bathroom', icon: 'Fan', mode: 'auto' },
  { id: 'a8', name: 'Towel Warmer', type: 'appliance', isOn: false, roomId: 'bathroom', icon: 'Heater', timer: 30 },
  
  // Garage
  { id: 'l10', name: 'Garage Light', type: 'light', isOn: false, roomId: 'garage', icon: 'Lightbulb', brightness: 100, colorTemp: 'cool' },
  { id: 'a9', name: 'Garage Door', type: 'appliance', isOn: false, roomId: 'garage', icon: 'DoorOpen', mode: 'closed' },
  { id: 'a10', name: 'EV Charger', type: 'appliance', isOn: false, roomId: 'garage', icon: 'BatteryCharging' },
  
  // Office
  { id: 'l11', name: 'Desk Lamp', type: 'light', isOn: true, roomId: 'office', icon: 'LampDesk', brightness: 85, colorTemp: 'neutral' },
  { id: 'l12', name: 'Overhead Light', type: 'light', isOn: true, roomId: 'office', icon: 'Lightbulb', brightness: 75, colorTemp: 'cool' },
  { id: 'c5', name: 'Desk Fan', type: 'climate', isOn: false, roomId: 'office', icon: 'Fan', mode: 'low' },
  { id: 'e4', name: 'Monitor', type: 'entertainment', isOn: false, roomId: 'office', icon: 'Monitor', brightness: 70 },
  { id: 'e5', name: 'Speakers', type: 'entertainment', isOn: false, roomId: 'office', icon: 'Speaker', volume: 50 },
  { id: 'a11', name: 'Smart Outlet', type: 'appliance', isOn: false, roomId: 'office', icon: 'Plug' },
];

export const useDevices = () => {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [devices, setDevices] = useState<Device[]>(initialDevices);

  const toggleDevice = (deviceId: string) => {
    setDevices(prev => prev.map(d => 
      d.id === deviceId ? { ...d, isOn: !d.isOn } : d
    ));
    updateRoomCounts();
  };

  const updateDevice = (deviceId: string, updates: Partial<Device>) => {
    setDevices(prev => prev.map(d => 
      d.id === deviceId ? { ...d, ...updates } : d
    ));
  };

  const addDevice = (device: Omit<Device, 'id'>) => {
    const newDevice: Device = {
      ...device,
      id: `dev_${Date.now()}`,
    };
    setDevices(prev => [...prev, newDevice]);
    updateRoomCounts();
  };

  const removeDevice = (deviceId: string) => {
    setDevices(prev => prev.filter(d => d.id !== deviceId));
    updateRoomCounts();
  };

  const getDevicesByRoom = (roomId: string) => {
    return devices.filter(d => d.roomId === roomId);
  };

  const getRoomById = (roomId: string) => {
    return rooms.find(r => r.id === roomId);
  };

  const updateRoomCounts = () => {
    setRooms(prev => prev.map(room => {
      const roomDevices = devices.filter(d => d.roomId === room.id);
      return {
        ...room,
        deviceCount: roomDevices.length,
        activeDevices: roomDevices.filter(d => d.isOn).length,
      };
    }));
  };

  const getAllRoomsOnCount = () => {
    return devices.filter(d => d.isOn).length;
  };

  const getTotalDevices = () => {
    return devices.length;
  };

  return {
    rooms,
    devices,
    toggleDevice,
    updateDevice,
    addDevice,
    removeDevice,
    getDevicesByRoom,
    getRoomById,
    getAllRoomsOnCount,
    getTotalDevices,
  };
};