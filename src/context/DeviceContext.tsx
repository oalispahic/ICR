import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Device, Room } from '@/types/devices';

const initialRooms: Room[] = [
  { 
    id: 'living', 
    name: 'Living Room', 
    icon: 'Sofa', 
    deviceCount: 8, 
    activeDevices: 4, 
    temperature: 22, 
    humidity: 45,
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=400&h=300&fit=crop'
  },
  { 
    id: 'bedroom', 
    name: 'Bedroom', 
    icon: 'Bed', 
    deviceCount: 5, 
    activeDevices: 1, 
    temperature: 20, 
    humidity: 50,
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&h=300&fit=crop'
  },
  { 
    id: 'kitchen', 
    name: 'Kitchen', 
    icon: 'ChefHat', 
    deviceCount: 7, 
    activeDevices: 3, 
    temperature: 23, 
    humidity: 55,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop'
  },
  { 
    id: 'bathroom', 
    name: 'Bathroom', 
    icon: 'Bath', 
    deviceCount: 4, 
    activeDevices: 2, 
    temperature: 24, 
    humidity: 70,
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop'
  },
  { 
    id: 'garage', 
    name: 'Garage', 
    icon: 'Car', 
    deviceCount: 3, 
    activeDevices: 0, 
    temperature: 18, 
    humidity: 40,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
  },
  { 
    id: 'office', 
    name: 'Office', 
    icon: 'Monitor', 
    deviceCount: 6, 
    activeDevices: 2, 
    temperature: 21, 
    humidity: 42,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop'
  },
];

const initialDevices: Device[] = [
  // Living Room
  { id: 'l1', name: 'Main Light', type: 'light', isOn: true, roomId: 'living', icon: 'Lightbulb', brightness: 80, colorTemp: 'warm', connected: true },
  { id: 'l2', name: 'Accent Lights', type: 'light', isOn: true, roomId: 'living', icon: 'Lamp', brightness: 60, colorTemp: 'neutral', connected: true },
  { id: 'l3', name: 'Floor Lamp', type: 'light', isOn: false, roomId: 'living', icon: 'LampDesk', brightness: 100, colorTemp: 'warm', connected: true },
  { id: 'c1', name: 'AC Unit', type: 'climate', isOn: true, roomId: 'living', icon: 'Snowflake', temperature: 22, mode: 'cool', connected: true },
  { id: 'e1', name: 'Smart TV', type: 'entertainment', isOn: true, roomId: 'living', icon: 'Tv', volume: 35, channel: 'Netflix', connected: true },
  { id: 'e2', name: 'Soundbar', type: 'entertainment', isOn: true, roomId: 'living', icon: 'Speaker', volume: 40, connected: true, nowPlaying: { title: 'Ambient Music', artist: 'Various Artists' } },
  { id: 'a1', name: 'Air Purifier', type: 'appliance', isOn: false, roomId: 'living', icon: 'Wind', mode: 'auto', connected: true },
  { id: 'a2', name: 'Smart Blinds', type: 'appliance', isOn: false, roomId: 'living', icon: 'PanelTop', mode: 'closed', connected: true },
  
  // Bedroom
  { id: 'l4', name: 'Ceiling Light', type: 'light', isOn: false, roomId: 'bedroom', icon: 'Lightbulb', brightness: 70, colorTemp: 'warm', connected: true },
  { id: 'l5', name: 'Bedside Lamp', type: 'light', isOn: true, roomId: 'bedroom', icon: 'Lamp', brightness: 30, colorTemp: 'warm', connected: true },
  { id: 'c2', name: 'Heater', type: 'climate', isOn: false, roomId: 'bedroom', icon: 'Flame', temperature: 20, mode: 'heat', connected: true },
  { id: 'a3', name: 'Humidifier', type: 'appliance', isOn: false, roomId: 'bedroom', icon: 'Droplets', mode: 'auto', connected: true },
  { id: 'e3', name: 'Bedroom TV', type: 'entertainment', isOn: false, roomId: 'bedroom', icon: 'Tv', volume: 20, connected: true },
  
  // Kitchen
  { id: 'l6', name: 'Kitchen Lights', type: 'light', isOn: true, roomId: 'kitchen', icon: 'Lightbulb', brightness: 100, colorTemp: 'cool', connected: true },
  { id: 'l7', name: 'Under Cabinet', type: 'light', isOn: true, roomId: 'kitchen', icon: 'LampDesk', brightness: 80, colorTemp: 'neutral', connected: true },
  { id: 'c3', name: 'Ventilation Fan', type: 'climate', isOn: true, roomId: 'kitchen', icon: 'Fan', mode: 'medium', connected: true },
  { id: 'a4', name: 'Coffee Maker', type: 'appliance', isOn: false, roomId: 'kitchen', icon: 'Coffee', timer: 0, connected: true },
  { id: 'a5', name: 'Smart Oven', type: 'appliance', isOn: false, roomId: 'kitchen', icon: 'Utensils', temperature: 180, connected: true },
  { id: 'a6', name: 'Dishwasher', type: 'appliance', isOn: false, roomId: 'kitchen', icon: 'Waves', mode: 'eco', connected: true },
  { id: 'a7', name: 'Smart Fridge', type: 'appliance', isOn: true, roomId: 'kitchen', icon: 'Refrigerator', temperature: 4, connected: true },
  
  // Bathroom
  { id: 'l8', name: 'Bathroom Light', type: 'light', isOn: true, roomId: 'bathroom', icon: 'Lightbulb', brightness: 100, colorTemp: 'cool', connected: true },
  { id: 'l9', name: 'Mirror Light', type: 'light', isOn: true, roomId: 'bathroom', icon: 'Lamp', brightness: 90, colorTemp: 'neutral', connected: true },
  { id: 'c4', name: 'Exhaust Fan', type: 'climate', isOn: false, roomId: 'bathroom', icon: 'Fan', mode: 'auto', connected: true },
  { id: 'a8', name: 'Towel Warmer', type: 'appliance', isOn: false, roomId: 'bathroom', icon: 'Heater', timer: 30, connected: false },
  
  // Garage
  { id: 'l10', name: 'Garage Light', type: 'light', isOn: false, roomId: 'garage', icon: 'Lightbulb', brightness: 100, colorTemp: 'cool', connected: true },
  { id: 'a9', name: 'Garage Door', type: 'appliance', isOn: false, roomId: 'garage', icon: 'DoorOpen', mode: 'closed', connected: true },
  { id: 'a10', name: 'EV Charger', type: 'appliance', isOn: false, roomId: 'garage', icon: 'BatteryCharging', connected: true },
  
  // Office
  { id: 'l11', name: 'Desk Lamp', type: 'light', isOn: true, roomId: 'office', icon: 'LampDesk', brightness: 85, colorTemp: 'neutral', connected: true },
  { id: 'l12', name: 'Overhead Light', type: 'light', isOn: true, roomId: 'office', icon: 'Lightbulb', brightness: 75, colorTemp: 'cool', connected: true },
  { id: 'c5', name: 'Desk Fan', type: 'climate', isOn: false, roomId: 'office', icon: 'Fan', mode: 'low', connected: true },
  { id: 'e4', name: 'Monitor', type: 'entertainment', isOn: false, roomId: 'office', icon: 'Monitor', brightness: 70, connected: true },
  { id: 'e5', name: 'Speakers', type: 'entertainment', isOn: false, roomId: 'office', icon: 'Speaker', volume: 50, connected: true },
  { id: 'a11', name: 'Smart Outlet', type: 'appliance', isOn: false, roomId: 'office', icon: 'Plug', connected: true },
];

interface DeviceContextType {
  rooms: Room[];
  devices: Device[];
  toggleDevice: (deviceId: string) => void;
  updateDevice: (deviceId: string, updates: Partial<Device>) => void;
  addDevice: (device: Omit<Device, 'id'>) => void;
  removeDevice: (deviceId: string) => void;
  getDevicesByRoom: (roomId: string) => Device[];
  getRoomById: (roomId: string) => Room | undefined;
  getAllRoomsOnCount: () => number;
  getTotalDevices: () => number;
  addRoom: (room: Omit<Room, 'id'>) => void;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const DeviceProvider = ({ children }: { children: ReactNode }) => {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [devices, setDevices] = useState<Device[]>(initialDevices);

  const toggleDevice = (deviceId: string) => {
    setDevices(prev => {
      const updated = prev.map(d => 
        d.id === deviceId ? { ...d, isOn: !d.isOn } : d
      );
      const affectedDevice = prev.find(d => d.id === deviceId);
      if (affectedDevice) {
        setRooms(rooms => rooms.map(room => {
          if (room.id === affectedDevice.roomId) {
            const roomDevices = updated.filter(d => d.roomId === room.id);
            return {
              ...room,
              activeDevices: roomDevices.filter(d => d.isOn).length,
            };
          }
          return room;
        }));
      }
      return updated;
    });
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
    setDevices(prev => {
      const updated = [...prev, newDevice];
      setRooms(rooms => rooms.map(room => {
        if (room.id === device.roomId) {
          const roomDevices = updated.filter(d => d.roomId === room.id);
          return {
            ...room,
            deviceCount: roomDevices.length,
            activeDevices: roomDevices.filter(d => d.isOn).length,
          };
        }
        return room;
      }));
      return updated;
    });
  };

  const removeDevice = (deviceId: string) => {
    const deviceToRemove = devices.find(d => d.id === deviceId);
    setDevices(prev => {
      const updated = prev.filter(d => d.id !== deviceId);
      if (deviceToRemove) {
        setRooms(rooms => rooms.map(room => {
          if (room.id === deviceToRemove.roomId) {
            const roomDevices = updated.filter(d => d.roomId === room.id);
            return {
              ...room,
              deviceCount: roomDevices.length,
              activeDevices: roomDevices.filter(d => d.isOn).length,
            };
          }
          return room;
        }));
      }
      return updated;
    });
  };

  const getDevicesByRoom = (roomId: string) => {
    return devices.filter(d => d.roomId === roomId);
  };

  const getRoomById = (roomId: string) => {
    return rooms.find(r => r.id === roomId);
  };

  const getAllRoomsOnCount = () => {
    return devices.filter(d => d.isOn).length;
  };

  const getTotalDevices = () => {
    return devices.length;
  };

  const addRoom = (room: Omit<Room, 'id'>) => {
    const newRoom: Room = {
      ...room,
      id: `room_${Date.now()}`,
    };
    setRooms(prev => [...prev, newRoom]);
  };

  return (
    <DeviceContext.Provider value={{
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
      addRoom,
    }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDeviceContext = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDeviceContext must be used within a DeviceProvider');
  }
  return context;
};