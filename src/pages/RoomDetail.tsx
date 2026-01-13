import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Plus, Lightbulb, Snowflake, Tv, Plug, 
  Power, QrCode, Trash2, Music, Pause, Play,
  Lamp, LampDesk, Fan, Flame, Speaker, Monitor, Wind, Coffee,
  Utensils, Waves, DoorOpen, BatteryCharging, PanelTop, Droplets, Thermometer,
  Check, Loader2
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useDeviceContext } from "@/context/DeviceContext";
import { Device, DeviceType, deviceTypeLabels } from "@/types/devices";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { BottomNav } from "@/components/dashboard/BottomNav";

const iconMap: Record<string, typeof Lightbulb> = {
  Lightbulb, Lamp, LampDesk, Snowflake, Flame, Fan, Tv, Speaker, Monitor,
  Wind, Coffee, Utensils, Waves, DoorOpen, BatteryCharging, Plug, PanelTop,
  Droplets, Thermometer
};

const RoomDetail = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { getRoomById, getDevicesByRoom, toggleDevice, updateDevice, addDevice, removeDevice } = useDeviceContext();
  
  const [isEditing, setIsEditing] = useState(false);
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [scanStep, setScanStep] = useState<'form' | 'scanning' | 'success'>('form');
  const [expandedDevice, setExpandedDevice] = useState<string | null>(null);
  const [newDeviceName, setNewDeviceName] = useState("");
  const [newDeviceType, setNewDeviceType] = useState<DeviceType>("light");
  const [isPlaying, setIsPlaying] = useState(true);

  const room = getRoomById(roomId || "");
  const devices = getDevicesByRoom(roomId || "");

  if (!room) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Room not found</p>
      </div>
    );
  }

  const getIcon = (iconName: string) => iconMap[iconName] || Plug;

  const handleStartScan = () => {
    if (!newDeviceName.trim()) {
      toast.error("Please enter a device name");
      return;
    }
    setScanStep('scanning');
    
    // Simulate scanning
    setTimeout(() => {
      setScanStep('success');
      
      // Add the device after success animation
      setTimeout(() => {
        const iconOptions: Record<DeviceType, string> = {
          light: 'Lightbulb',
          climate: 'Fan',
          entertainment: 'Tv',
          appliance: 'Plug',
        };
        
        addDevice({
          name: newDeviceName,
          type: newDeviceType,
          isOn: false,
          roomId: roomId || "",
          icon: iconOptions[newDeviceType],
          brightness: newDeviceType === 'light' ? 100 : undefined,
          colorTemp: newDeviceType === 'light' ? 'neutral' : undefined,
          volume: newDeviceType === 'entertainment' ? 50 : undefined,
          temperature: newDeviceType === 'climate' ? 22 : undefined,
          connected: true,
        });
        
        toast.success("Device added successfully!", {
          description: `${newDeviceName} has been registered to ${room.name}`,
        });
        
        // Reset and close
        setNewDeviceName("");
        setNewDeviceType("light");
        setScanStep('form');
        setShowAddDevice(false);
      }, 1000);
    }, 2000);
  };

  const handleCloseDialog = () => {
    setShowAddDevice(false);
    setScanStep('form');
    setNewDeviceName("");
    setNewDeviceType("light");
  };

  const handleDeleteDevice = (deviceId: string) => {
    removeDevice(deviceId);
    toast.success("Device removed");
  };

  const handleToggleDevice = (deviceId: string) => {
    toggleDevice(deviceId);
  };

  const typeIcons: Record<DeviceType, typeof Lightbulb> = {
    light: Lightbulb,
    climate: Snowflake,
    entertainment: Tv,
    appliance: Plug,
  };

  // Get featured device (first on device or speaker)
  const featuredDevice = devices.find(d => d.isOn && (d.type === 'light' || d.type === 'entertainment'));
  const speakerDevice = devices.find(d => d.type === 'entertainment' && d.nowPlaying);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-5 pt-10 pb-4">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-card rounded-full flex items-center justify-center card-shadow"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <button 
            onClick={() => setShowAddDevice(true)}
            className="px-4 py-2 bg-card rounded-full text-foreground font-medium text-sm card-shadow flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add device
          </button>
        </div>
        
        <h1 className="text-2xl font-semibold text-foreground">{room.name}</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Control each device</p>
      </div>

      {/* Device Cards */}
      <div className="px-5 space-y-4">
        {/* Featured Device Card */}
        {featuredDevice && (
          <div className="bg-card rounded-2xl p-4 card-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full ${featuredDevice.connected !== false ? 'bg-accent' : 'bg-muted-foreground'}`} />
                  <span className={`text-sm font-medium ${featuredDevice.connected !== false ? 'text-accent' : 'text-muted-foreground'}`}>
                    {featuredDevice.connected !== false ? 'Connected' : 'Offline'}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-foreground">{featuredDevice.name}</h2>
                
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => handleToggleDevice(featuredDevice.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                      featuredDevice.isOn 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    <Power className="w-4 h-4" />
                    {featuredDevice.isOn ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>
              
              <div className={`w-20 h-20 rounded-xl flex items-center justify-center transition-colors ${
                featuredDevice.isOn ? 'bg-primary/20' : 'bg-muted'
              }`}>
                {(() => {
                  const Icon = getIcon(featuredDevice.icon);
                  return <Icon className={`w-10 h-10 ${featuredDevice.isOn ? 'text-primary' : 'text-muted-foreground'}`} />;
                })()}
              </div>
            </div>
          </div>
        )}

        {/* Device Grid */}
        <div className="grid grid-cols-2 gap-3">
          {devices.filter(d => d.id !== featuredDevice?.id && d.id !== speakerDevice?.id).map((device) => {
            const Icon = getIcon(device.icon);
            return (
              <div
                key={device.id}
                className="bg-card rounded-2xl p-3 card-shadow relative"
              >
                {isEditing && (
                  <button
                    onClick={() => handleDeleteDevice(device.id)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-destructive rounded-full flex items-center justify-center text-destructive-foreground z-10"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
                
                <div className="flex items-start justify-between mb-2">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    device.isOn ? 'bg-primary/20' : 'bg-muted'
                  }`}>
                    <Icon className={`w-6 h-6 ${device.isOn ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  
                  <Switch
                    checked={device.isOn}
                    onCheckedChange={() => handleToggleDevice(device.id)}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>
                
                <h3 className="font-medium text-foreground text-sm leading-tight">{device.name}</h3>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${device.connected !== false ? 'bg-accent' : 'bg-muted-foreground'}`} />
                    <span className={`text-xs ${device.connected !== false ? 'text-accent' : 'text-muted-foreground'}`}>
                      {device.connected !== false ? 'Connected' : 'Offline'}
                    </span>
                  </div>
                  <span className={`text-xs font-medium ${device.isOn ? 'text-primary' : 'text-muted-foreground'}`}>
                    {device.isOn ? 'ON' : 'OFF'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Now Playing Card */}
        {speakerDevice && speakerDevice.nowPlaying && (
          <div className="bg-foreground rounded-2xl p-4 flex items-center gap-4">
            <div className="w-16 h-16 bg-muted/20 rounded-xl flex items-center justify-center">
              <Music className="w-8 h-8 text-background/60" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-background/60 text-xs font-medium uppercase tracking-wide">Now Playing</p>
              <h3 className="text-background font-semibold truncate">{speakerDevice.nowPlaying.title}</h3>
              <p className="text-background/60 text-sm truncate">{speakerDevice.nowPlaying.artist}</p>
            </div>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-8 bg-background/20 rounded-full flex items-center justify-center"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-background" />
              ) : (
                <Play className="w-4 h-4 text-background" />
              )}
            </button>
          </div>
        )}

        {/* Edit Mode Toggle */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`w-full py-3 rounded-xl font-medium text-sm transition-colors ${
            isEditing 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted text-muted-foreground'
          }`}
        >
          {isEditing ? 'Done Editing' : 'Edit Devices'}
        </button>
      </div>

      {/* Add Device Dialog */}
      <Dialog open={showAddDevice} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle>
              {scanStep === 'form' && 'Add New Device'}
              {scanStep === 'scanning' && 'Scanning...'}
              {scanStep === 'success' && 'Device Found!'}
            </DialogTitle>
          </DialogHeader>
          
          {scanStep === 'scanning' && (
            <div className="py-12 flex flex-col items-center gap-4">
              <div className="w-40 h-40 border-4 border-primary rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5" />
                <div 
                  className="absolute top-0 left-0 right-0 h-1 bg-primary rounded-full"
                  style={{ 
                    animation: 'scanLine 1.5s ease-in-out infinite'
                  }} 
                />
                <QrCode className="w-20 h-20 text-primary" />
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Looking for {newDeviceName}...</span>
              </div>
            </div>
          )}

          {scanStep === 'success' && (
            <div className="py-12 flex flex-col items-center gap-4">
              <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center">
                <Check className="w-10 h-10 text-accent" />
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-foreground">{newDeviceName}</p>
                <p className="text-muted-foreground text-sm mt-1">Successfully connected!</p>
              </div>
            </div>
          )}
          
          {scanStep === 'form' && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Device Name</label>
                <input
                  type="text"
                  value={newDeviceName}
                  onChange={(e) => setNewDeviceName(e.target.value)}
                  placeholder="e.g., Smart Lamp Pro"
                  className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Device Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(deviceTypeLabels) as DeviceType[]).map((type) => {
                    const TypeIcon = typeIcons[type];
                    return (
                      <button
                        key={type}
                        onClick={() => setNewDeviceType(type)}
                        className={`p-3 rounded-xl flex items-center gap-2 transition-colors ${
                          newDeviceType === type
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        <TypeIcon className="w-5 h-5" />
                        <span className="text-sm font-medium">{deviceTypeLabels[type]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <button
                onClick={handleStartScan}
                className="w-full py-3 gradient-primary text-primary-foreground rounded-xl font-medium flex items-center justify-center gap-2"
              >
                <QrCode className="w-5 h-5" />
                Scan QR Code
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Scan animation keyframes */}
      <style>{`
        @keyframes scanLine {
          0%, 100% { top: 0; }
          50% { top: calc(100% - 4px); }
        }
      `}</style>

      <BottomNav />
    </div>
  );
};

export default RoomDetail;