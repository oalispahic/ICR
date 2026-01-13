import { EnergyUsageCard } from "@/components/dashboard/EnergyUsageCard";
import { TemperatureCard } from "@/components/dashboard/TemperatureCard";
import { LightsCard } from "@/components/dashboard/LightsCard";
import { LockCard } from "@/components/dashboard/LockCard";
import { BottomNav } from "@/components/dashboard/BottomNav";
import { useState } from "react";
import { X, Plus, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type CardType = 'energy' | 'temperature' | 'lights' | 'lock' | 'climate' | 'security' | 'scenes';

interface CardConfig {
  component: React.ReactNode;
  label: string;
  description: string;
  available: boolean;
}

const Home = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAddCards, setShowAddCards] = useState(false);
  const [visibleCards, setVisibleCards] = useState<CardType[]>(['energy', 'temperature', 'lights', 'lock']);

  const toggleCard = (card: CardType) => {
    setVisibleCards(prev => 
      prev.includes(card) 
        ? prev.filter(c => c !== card)
        : [...prev, card]
    );
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

  const availableToAdd = (Object.keys(cardComponents) as CardType[]).filter(
    card => cardComponents[card].available && !visibleCards.includes(card)
  );

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <div className="px-5 pt-10 pb-3">
        <h1 className="text-2xl font-semibold text-foreground mb-3">Welcome home,</h1>
        
        <div className="flex items-center justify-between">
          <span className="text-base font-medium text-foreground">At a glance</span>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowAddCards(true)}
              className="w-8 h-8 rounded-full bg-card flex items-center justify-center card-shadow"
            >
              <Plus className="w-4 h-4 text-foreground" />
            </button>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium card-shadow transition-colors ${
                isEditing ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground'
              }`}
            >
              {isEditing ? 'Done' : 'Edit'}
            </button>
          </div>
        </div>
      </div>

      {/* Edit Mode Panel */}
      {isEditing && (
        <div className="px-5 mb-3">
          <div className="bg-card rounded-xl p-3 card-shadow">
            <p className="text-sm text-muted-foreground mb-2">Visible cards:</p>
            <div className="flex flex-wrap gap-2">
              {visibleCards.map((card) => (
                <button
                  key={card}
                  onClick={() => toggleCard(card)}
                  className="px-3 py-1.5 rounded-full text-sm font-medium bg-primary text-primary-foreground flex items-center gap-1"
                >
                  {cardComponents[card].label}
                  <X className="w-3 h-3" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 px-5 space-y-3">
        {visibleCards.includes('energy') && (
          <div className="relative">
            {isEditing && (
              <button
                onClick={() => toggleCard('energy')}
                className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center z-10"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <EnergyUsageCard />
          </div>
        )}
        
        {visibleCards.includes('temperature') && (
          <div className="relative">
            {isEditing && (
              <button
                onClick={() => toggleCard('temperature')}
                className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center z-10"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <TemperatureCard />
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-3">
          {visibleCards.includes('lights') && (
            <div className="relative">
              {isEditing && (
                <button
                  onClick={() => toggleCard('lights')}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center z-10"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <LightsCard />
            </div>
          )}
          {visibleCards.includes('lock') && (
            <div className="relative">
              {isEditing && (
                <button
                  onClick={() => toggleCard('lock')}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center z-10"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <LockCard />
            </div>
          )}
        </div>
      </div>

      {/* Add Cards Dialog */}
      <Dialog open={showAddCards} onOpenChange={setShowAddCards}>
        <DialogContent
  className="
    w-[92vw] 
    max-w-[420px]
    sm:max-w-md
    p-4 sm:p-6
    rounded-xl
    bg-card 
    border-border
  "
>
          <DialogHeader>
            <DialogTitle>Add Dashboard Cards</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-2 py-2 sm:space-y-3 sm:py-4">    
          <p className="text-sm text-muted-foreground">
              Select cards to add to your dashboard
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
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default Home;