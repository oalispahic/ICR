import { Lightbulb, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LightsCard = () => {
  const [isOn, setIsOn] = useState(true);
  const [brightness, setBrightness] = useState(100);
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate('/rooms')}
      className={`rounded-2xl p-5 shadow-sm h-36 flex flex-col justify-between text-left transition-all w-full ${
        isOn ? 'bg-[hsl(45_90%_55%)]' : 'bg-card'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          isOn ? 'bg-white/30' : 'bg-muted'
        }`}>
          <Lightbulb className={`w-5 h-5 ${isOn ? 'text-white' : 'text-muted-foreground'}`} fill={isOn ? "currentColor" : "none"} />
        </div>
        <ChevronRight className={`w-5 h-5 ${isOn ? 'text-white/70' : 'text-muted-foreground'}`} />
      </div>
      
      <div>
        <p className={`text-sm ${isOn ? 'text-white/80' : 'text-muted-foreground'}`}>Living Room</p>
        <p className={`text-lg font-semibold ${isOn ? 'text-white' : 'text-foreground'}`}>Lights</p>
        <p className={`text-sm ${isOn ? 'text-white/80' : 'text-muted-foreground'}`}>{isOn ? `${brightness}%` : 'Off'}</p>
      </div>
    </button>
  );
};