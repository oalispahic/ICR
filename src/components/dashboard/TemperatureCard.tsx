import { Thermometer, Droplets, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useDeviceContext } from "@/context/DeviceContext";

export const TemperatureCard = () => {
  const { rooms } = useDeviceContext();
  const [selectedRoomId, setSelectedRoomId] = useState(rooms[0]?.id || 'kitchen');
  const [showDropdown, setShowDropdown] = useState(false);

  const selectedRoom = rooms.find(r => r.id === selectedRoomId) || rooms[0];
  const temperature = selectedRoom?.temperature || 22;
  const humidity = selectedRoom?.humidity || 45;

  return (
    <div className="bg-card rounded-2xl p-5 card-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
            <Thermometer className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Temperature</h3>
            <p className="text-muted-foreground text-sm">and humidity</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center">
              <Thermometer className="w-4 h-4 text-accent" />
            </div>
            <span className="text-foreground font-semibold text-lg">{temperature}°</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <Droplets className="w-4 h-4 text-primary" />
            </div>
            <span className="text-foreground font-semibold text-lg">{humidity}%</span>
          </div>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="px-4 py-2 bg-secondary rounded-full text-sm text-foreground font-medium flex items-center gap-1"
          >
            {selectedRoom?.name || 'Select Room'}
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 bg-card rounded-xl shadow-lg border border-border overflow-hidden z-10 min-w-[140px]">
              {rooms.map(room => (
                <button
                  key={room.id}
                  onClick={() => {
                    setSelectedRoomId(room.id);
                    setShowDropdown(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors ${
                    selectedRoomId === room.id ? 'text-primary font-medium' : 'text-foreground'
                  }`}
                >
                  {room.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
