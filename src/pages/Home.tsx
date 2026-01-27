import { EnergyUsageCard } from "@/components/dashboard/EnergyUsageCard";
import { TemperatureCard } from "@/components/dashboard/TemperatureCard";
import { LightsCard } from "@/components/dashboard/LightsCard";
import { LockCard } from "@/components/dashboard/LockCard";
import { BottomNav } from "@/components/dashboard/BottomNav";
import { useState } from "react";
import { X, Plus, Check, Power } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useDeviceContext } from "@/context/DeviceContext";
import { Switch } from "@/components/ui/switch";

type CardType = 'energy' | 'temperature' | 'lights' | 'lock' | 'climate' | 'security' | 'scenes';
type DataType = 'energy' | 'temperature' | 'humidity' | 'lights' | 'security' | 'custom' | 'device';

interface CardConfig {
  component: React.ReactNode;
  label: string;
  description: string;
  available: boolean;
}

interface CustomCard {
  id: string;
  name: string;
  dataType: DataType;
  value: string;
  deviceId?: string;
  roomId?: string;
}

const dataTypeOptions: { value: DataType; label: string; unit: string }[] = [
  { value: 'device', label: 'Device Control', unit: '' },
  { value: 'energy', label: 'Energy Usage', unit: 'kWh' },
  { value: 'temperature', label: 'Temperature', unit: '°C' },
  { value: 'humidity', label: 'Humidity', unit: '%' },
  { value: 'lights', label: 'Lights Status', unit: 'active' },
  { value: 'security', label: 'Security Status', unit: '' },
  { value: 'custom', label: 'Custom Value', unit: '' },
];

const Home = () => {
  const { rooms, devices, toggleDevice, getDevicesByRoom } = useDeviceContext();
  const [isEditing, setIsEditing] = useState(false);
  const [showAddCards, setShowAddCards] = useState(false);
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [visibleCards, setVisibleCards] = useState<CardType[]>(['energy', 'temperature', 'lights', 'lock']);
  const [customCards, setCustomCards] = useState<CustomCard[]>([]);
  const [newCardName, setNewCardName] = useState('');
  const [newCardDataType, setNewCardDataType] = useState<DataType>('device');
  const [selectedRoomId, setSelectedRoomId] = useState<string>('');
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');

  const toggleCard = (card: CardType) => {
    setVisibleCards(prev => 
      prev.includes(card) 
        ? prev.filter(c => c !== card)
        : [...prev, card]
    );
  };

  const roomDevices = selectedRoomId ? getDevicesByRoom(selectedRoomId) : [];

  const handleCreateCard = () => {
    if (!newCardName.trim()) return;
    
    const newCard: CustomCard = {
      id: `custom-${Date.now()}`,
      name: newCardName,
      dataType: newCardDataType,
      value: getDefaultValue(newCardDataType),
      deviceId: newCardDataType === 'device' ? selectedDeviceId : undefined,
      roomId: newCardDataType === 'device' ? selectedRoomId : undefined,
    };
    
    setCustomCards(prev => [...prev, newCard]);
    setNewCardName('');
    setNewCardDataType('device');
    setSelectedRoomId('');
    setSelectedDeviceId('');
    setShowCreateCard(false);
  };

  const getDefaultValue = (type: DataType): string => {
    switch (type) {
      case 'energy': return '24.5';
      case 'temperature': return '22';
      case 'humidity': return '45';
      case 'lights': return '3';
      case 'security': return 'Armed';
      case 'device': return '';
      default: return '—';
    }
  };

  const removeCustomCard = (id: string) => {
    setCustomCards(prev => prev.filter(c => c.id !== id));
  };

  const cardComponents: Record<CardType, CardConfig> = {
    energy: { component: <EnergyUsageCard />, label: 'Energy Usage', description: 'Track power consumption', available: true },
    temperature: { component: <TemperatureCard />, label: 'Temperature', description: 'Room climate info', available: true },
    lights: { component: <LightsCard />, label: 'Lights', description: 'Quick light control', available: true },
    lock: { component: <LockCard />, label: 'Lock', description: 'Door security status', available: true },
    climate: { component: null, label: 'Climate Control', description: 'HVAC quick access', available: false },
    security: { component: null, label: 'Security', description: 'Camera feeds', available: false },
    scenes: { component: null, label: 'Scenes', description: 'Quick automations', available: false },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <div className="px-5 pt-10 pb-3">
        <h1 className="text-2xl font-semibold text-foreground mb-3">Welcome home,</h1>
        
        <div className="flex items-center justify-between">
          <span className="text-base font-medium text-foreground">At a glance</span>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowCreateCard(true)}
              className="w-8 h-8 rounded-full bg-card flex items-center justify-center card-shadow"
            >
              <Plus className="w-4 h-4 text-foreground" />
            </button>
            <button 
              onClick={() => setShowAddCards(true)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium card-shadow transition-colors bg-card text-foreground`}
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 px-5 space-y-3">
        {visibleCards.includes('energy') && (
          <div className="relative">
            <EnergyUsageCard />
          </div>
        )}
        
        {visibleCards.includes('temperature') && (
          <div className="relative">
            <TemperatureCard />
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-3">
          {visibleCards.includes('lights') && (
            <div className="relative">
              <LightsCard />
            </div>
          )}
          {visibleCards.includes('lock') && (
            <div className="relative">
              <LockCard />
            </div>
          )}
        </div>

        {/* Custom Cards */}
        {customCards.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {customCards.map((card) => {
              const dataOption = dataTypeOptions.find(d => d.value === card.dataType);
              const device = card.deviceId ? devices.find(d => d.id === card.deviceId) : null;
              const room = card.roomId ? rooms.find(r => r.id === card.roomId) : null;
              
              return (
                <div key={card.id} className="relative bg-card rounded-2xl p-4 card-shadow">
                  {isEditing && (
                    <button
                      onClick={() => removeCustomCard(card.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center z-10"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  
                  {card.dataType === 'device' && device ? (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">{room?.name}</p>
                        <p className="text-sm font-semibold text-foreground">{device.name}</p>
                      </div>
                      <Switch
                        checked={device.isOn}
                        onCheckedChange={() => toggleDevice(device.id)}
                      />
                    </div>
                  ) : (
                    <>
                      <p className="text-xs text-muted-foreground mb-1">{card.name}</p>
                      <p className="text-2xl font-bold text-foreground">
                        {card.value}
                        <span className="text-sm font-normal text-muted-foreground ml-1">
                          {dataOption?.unit}
                        </span>
                      </p>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Edit Cards Dialog */}
      <Dialog open={showAddCards} onOpenChange={setShowAddCards}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle>Edit Dashboard Cards</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-3 py-4">
            <p className="text-sm text-muted-foreground">
              Toggle cards to show or hide on dashboard
            </p>
            
            {(Object.keys(cardComponents) as CardType[]).map((card) => {
              const config = cardComponents[card];
              const isActive = visibleCards.includes(card);
              const isAvailable = config.available;
              
              return (
                <button
                  key={card}
                  onClick={() => isAvailable && toggleCard(card)}
                  disabled={!isAvailable}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${
                    !isAvailable 
                      ? 'bg-muted/50 opacity-50 cursor-not-allowed'
                      : isActive 
                        ? 'bg-primary/10 border border-primary' 
                        : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  <div className="text-left">
                    <p className={`font-medium ${isActive ? 'text-primary' : 'text-foreground'}`}>
                      {config.label}
                    </p>
                    <p className="text-xs text-muted-foreground">{config.description}</p>
                    {!isAvailable && (
                      <p className="text-xs text-muted-foreground mt-1">Coming soon</p>
                    )}
                  </div>
                  {isActive && isAvailable && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                </button>
              );
            })}

            {/* Custom Cards Section */}
            {customCards.length > 0 && (
              <>
                <div className="border-t border-border pt-3 mt-3">
                  <p className="text-sm font-medium text-foreground mb-2">Custom Cards</p>
                </div>
                {customCards.map((card) => (
                  <div
                    key={card.id}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-primary/10 border border-primary"
                  >
                    <div className="text-left">
                      <p className="font-medium text-primary">{card.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {dataTypeOptions.find(d => d.value === card.dataType)?.label}
                      </p>
                    </div>
                    <button
                      onClick={() => removeCustomCard(card.id)}
                      className="w-6 h-6 bg-destructive rounded-full flex items-center justify-center"
                    >
                      <X className="w-4 h-4 text-destructive-foreground" />
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Custom Card Dialog */}
      <Dialog open={showCreateCard} onOpenChange={setShowCreateCard}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle>Create New Card</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="cardName">Card Name</Label>
              <Input
                id="cardName"
                placeholder="e.g., Kitchen Light Switch"
                value={newCardName}
                onChange={(e) => setNewCardName(e.target.value)}
                className="bg-muted border-border"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Card Type</Label>
              <Select value={newCardDataType} onValueChange={(v) => {
                setNewCardDataType(v as DataType);
                setSelectedRoomId('');
                setSelectedDeviceId('');
              }}>
                <SelectTrigger className="bg-muted border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dataTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {newCardDataType === 'device' && (
              <>
                <div className="space-y-2">
                  <Label>Select Room</Label>
                  <Select value={selectedRoomId} onValueChange={(v) => {
                    setSelectedRoomId(v);
                    setSelectedDeviceId('');
                  }}>
                    <SelectTrigger className="bg-muted border-border">
                      <SelectValue placeholder="Choose a room" />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms.map((room) => (
                        <SelectItem key={room.id} value={room.id}>
                          {room.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedRoomId && (
                  <div className="space-y-2">
                    <Label>Select Device</Label>
                    <Select value={selectedDeviceId} onValueChange={setSelectedDeviceId}>
                      <SelectTrigger className="bg-muted border-border">
                        <SelectValue placeholder="Choose a device" />
                      </SelectTrigger>
                      <SelectContent>
                        {roomDevices.map((device) => (
                          <SelectItem key={device.id} value={device.id}>
                            {device.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </>
            )}

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowCreateCard(false);
                  setSelectedRoomId('');
                  setSelectedDeviceId('');
                }}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleCreateCard}
                disabled={!newCardName.trim() || (newCardDataType === 'device' && !selectedDeviceId)}
              >
                Create Card
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default Home;