import { useState } from "react";
import { Flame, Lightbulb, Camera, BarChart3, Settings2 } from "lucide-react";
import { BottomNav } from "@/components/dashboard/BottomNav";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

interface ModuleConfig {
  id: string;
  name: string;
  icon: typeof Flame;
  enabled: boolean;
  route: string;
}

const Control = () => {
  const navigate = useNavigate();
  const [showCustomize, setShowCustomize] = useState(false);
  const [modules, setModules] = useState<ModuleConfig[]>([
    { id: 'climate', name: 'Climate Control', icon: Flame, enabled: true, route: '/climate' },
    { id: 'rooms', name: 'Rooms', icon: Lightbulb, enabled: true, route: '/rooms' },
    { id: 'cameras', name: 'Camera Status', icon: Camera, enabled: true, route: '/cameras' },
    { id: 'stats', name: 'Stats & Bills', icon: BarChart3, enabled: true, route: '/stats' },
  ]);

  const toggleModule = (id: string) => {
    setModules(prev => prev.map(m => 
      m.id === id ? { ...m, enabled: !m.enabled } : m
    ));
  };

  const enabledModules = modules.filter(m => m.enabled);

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <div className="px-5 pt-10 pb-4">
        <h1 className="text-2xl font-semibold text-foreground">Control</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Select a module</p>
      </div>

      <div className="flex-1 px-5 space-y-3">
        {/* First Row */}
        <div className="grid grid-cols-2 gap-3">
          {enabledModules.slice(0, 2).map((module) => {
            const Icon = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => navigate(module.route)}
                className="bg-card rounded-2xl p-4 card-shadow text-left hover:card-shadow-lg transition-shadow"
              >
                <h3 className="text-base font-semibold text-foreground">{module.name}</h3>
                <p className="text-muted-foreground text-sm mt-0.5">
                  {module.id === 'climate' && 'Global heat control'}
                  {module.id === 'rooms' && 'Room selection'}
                  {module.id === 'cameras' && 'Security feeds'}
                  {module.id === 'stats' && 'Usage & billing'}
                </p>
                <Icon className="w-7 h-7 text-foreground mt-3" />
              </button>
            );
          })}
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-2 gap-3">
          {enabledModules.slice(2, 4).map((module) => {
            const Icon = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => navigate(module.route)}
                className="bg-card rounded-2xl p-4 card-shadow h-36 flex flex-col justify-between text-left hover:card-shadow-lg transition-shadow"
              >
                {module.id === 'cameras' ? (
                  <>
                    <div className="flex justify-center">
                      <Icon className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{module.name}</h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                        <span className="text-muted-foreground text-xs">Online</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-sm font-semibold text-foreground">{module.name}</h3>
                    <Icon className="w-full h-14 text-muted-foreground" />
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* Additional modules if more than 4 */}
        {enabledModules.length > 4 && (
          <div className="grid grid-cols-2 gap-3">
            {enabledModules.slice(4).map((module) => {
              const Icon = module.icon;
              return (
                <button
                  key={module.id}
                  onClick={() => navigate(module.route)}
                  className="bg-card rounded-2xl p-4 card-shadow text-left hover:card-shadow-lg transition-shadow"
                >
                  <h3 className="text-sm font-semibold text-foreground">{module.name}</h3>
                  <Icon className="w-7 h-7 text-foreground mt-3" />
                </button>
              );
            })}
          </div>
        )}

        <button 
          onClick={() => setShowCustomize(true)}
          className="w-full py-3 bg-primary text-primary-foreground rounded-2xl font-medium mt-4 flex items-center justify-center gap-2"
        >
          <Settings2 className="w-5 h-5" />
          Customize page content
        </button>
      </div>

      {/* Customize Dialog */}
      <Dialog open={showCustomize} onOpenChange={setShowCustomize}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle>Customize Modules</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Toggle which modules appear on your Control page
            </p>
            
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <div 
                  key={module.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-background rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-foreground" />
                    </div>
                    <span className="font-medium text-foreground">{module.name}</span>
                  </div>
                  <Switch
                    checked={module.enabled}
                    onCheckedChange={() => toggleModule(module.id)}
                  />
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default Control;