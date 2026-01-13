import { useState, useRef, useCallback } from "react";
import { Flame, Snowflake, Wind, Droplets, Sun } from "lucide-react";
import { BottomNav } from "@/components/dashboard/BottomNav";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const ClimateControl = () => {
  const [temperature, setTemperature] = useState(22);
  const [isHeating, setIsHeating] = useState(true);
  const [acEnabled, setAcEnabled] = useState(false);
  const [acTemp, setAcTemp] = useState(22);
  const [selectedRoom, setSelectedRoom] = useState('kitchen');
  const dialRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const minTemp = 10;
  const maxTemp = 30;
  const range = maxTemp - minTemp;
  const angle = ((temperature - minTemp) / range) * 270 - 135; // -135 to 135 degrees

  const calculateTemperature = useCallback((clientX: number, clientY: number) => {
    if (!dialRef.current) return;
    
    const rect = dialRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = clientX - centerX;
    const deltaY = centerY - clientY;
    let newAngle = Math.atan2(deltaX, deltaY) * (180 / Math.PI);
    
    // Map angle to temperature (use larger arc for better control)
    // -135 to 135 degrees = full range
    newAngle = Math.max(-135, Math.min(135, newAngle));
    
    const newTemp = Math.round(((newAngle + 135) / 270) * range + minTemp);
    setTemperature(Math.max(minTemp, Math.min(maxTemp, newTemp)));
  }, [range, minTemp, maxTemp]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    calculateTemperature(e.clientX, e.clientY);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        calculateTemperature(e.clientX, e.clientY);
      }
    };
    
    const handleMouseUp = () => {
      isDragging.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [calculateTemperature]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    isDragging.current = true;
    const touch = e.touches[0];
    calculateTemperature(touch.clientX, touch.clientY);
    
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging.current && e.touches[0]) {
        e.preventDefault();
        calculateTemperature(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    
    const handleTouchEnd = () => {
      isDragging.current = false;
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
  }, [calculateTemperature]);

  const handleSetTemperature = () => {
    toast.success(`Temperature set to ${temperature}°C`, {
      description: `${selectedRoom.charAt(0).toUpperCase() + selectedRoom.slice(1)} heating ${isHeating ? 'enabled' : 'disabled'}`,
    });
  };

  const rooms = ['kitchen', 'living room', 'bedroom', 'bathroom'];

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <div className="px-5 pt-10 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Climate Control</h1>
            <p className="text-muted-foreground text-sm mt-0.5">Adjust main heating system</p>
          </div>
          <Switch 
            checked={isHeating}
            onCheckedChange={setIsHeating}
          />
        </div>
      </div>

      <div className="flex-1 px-5 space-y-6">
        {/* Temperature Dial */}
        <div className="flex flex-col items-center py-4">
          {/* Temperature Labels */}
          <div className="relative w-64 h-44 mb-2">
            <span className="absolute left-0 bottom-8 text-muted-foreground text-sm font-medium">{minTemp}°</span>
            <span className="absolute left-1/2 -translate-x-1/2 top-0 text-muted-foreground text-sm font-medium">20°</span>
            <span className="absolute right-0 bottom-8 text-muted-foreground text-sm font-medium">{maxTemp}°</span>
            
            {/* Dial */}
            <div 
              ref={dialRef}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 w-52 h-52 cursor-grab active:cursor-grabbing touch-none select-none"
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              {/* Outer ring with gradient */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-muted to-secondary" />
              
              {/* Progress arc */}
              <svg className="absolute inset-0 w-full h-full" style={{ transform: 'rotate(-135deg)' }}>
                <circle
                  cx="104"
                  cy="104"
                  r="96"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="452"
                  strokeDashoffset="150"
                />
                <circle
                  cx="104"
                  cy="104"
                  r="96"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${((temperature - minTemp) / range) * 302} 604`}
                  className="transition-all duration-100"
                />
              </svg>
              
              {/* Inner dial */}
              <div className="absolute inset-4 rounded-full bg-card card-shadow-lg flex flex-col items-center justify-center">
                <span className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                  {isHeating ? 'Heating' : 'Off'}
                </span>
                <span className="text-5xl font-light text-foreground mt-1 tabular-nums">{temperature}°</span>
                <Wind className="w-5 h-5 text-primary mt-2" />
              </div>
              
              {/* Dial indicator */}
              <div 
                className="absolute w-4 h-4 bg-primary rounded-full shadow-lg border-2 border-background transition-all duration-100"
                style={{
                  left: `${50 + 44 * Math.sin(angle * Math.PI / 180)}%`,
                  top: `${50 - 44 * Math.cos(angle * Math.PI / 180)}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
              
              {/* Tick marks */}
              {Array.from({ length: 21 }).map((_, i) => {
                const tickAngle = -135 + (i * 13.5);
                const isMajor = i % 5 === 0;
                return (
                  <div
                    key={i}
                    className={`absolute bg-muted-foreground/40 ${isMajor ? 'w-0.5 h-3' : 'w-px h-2'}`}
                    style={{
                      left: '50%',
                      top: '6px',
                      transformOrigin: '50% 98px',
                      transform: `translateX(-50%) rotate(${tickAngle}deg)`,
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Set Temperature Button */}
          <button 
            className="px-8 py-3 gradient-primary text-primary-foreground rounded-full font-medium mt-6"
            onClick={handleSetTemperature}
          >
            Set temperature
          </button>
        </div>

        {/* Air Conditioning Card */}
        <div className="bg-card rounded-2xl p-4 card-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Snowflake className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium text-foreground">Air conditioning</span>
            </div>
            <Switch 
              checked={acEnabled}
              onCheckedChange={setAcEnabled}
            />
          </div>
          
          {/* Temperature Selector */}
          <div className="flex items-center justify-between mb-3">
            {[14, 18, 22, 26, 30].map((temp) => (
              <button
                key={temp}
                onClick={() => setAcTemp(temp)}
                className={`relative px-2 py-1 text-sm font-medium transition-colors ${
                  acTemp === temp ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {temp}°
                {acTemp === temp && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>
          
          {/* Slider track */}
          <div className="h-1.5 bg-muted rounded-full relative mb-4">
            <div 
              className="absolute h-full bg-primary/50 rounded-full transition-all"
              style={{ width: `${((acTemp - 14) / 16) * 100}%` }}
            />
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center hover:bg-muted/80 transition-colors">
                <Sun className="w-4 h-4 text-muted-foreground" />
              </button>
              <button className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center hover:bg-muted/80 transition-colors">
                <Snowflake className="w-4 h-4 text-muted-foreground" />
              </button>
              <button className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center hover:bg-muted/80 transition-colors">
                <Droplets className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            
            {/* Room Selector */}
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="px-4 py-1.5 bg-secondary rounded-full text-sm font-medium text-secondary-foreground border-none focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {rooms.map(room => (
                <option key={room} value={room}>
                  {room.charAt(0).toUpperCase() + room.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ClimateControl;