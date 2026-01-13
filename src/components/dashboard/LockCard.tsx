import { Lock, LockOpen, Shield } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const LockCard = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsLocked(!isLocked);
      setIsAnimating(false);
      toast.success(isLocked ? "Front door unlocked" : "Front door locked", {
        description: isLocked ? "Be sure to lock it when you leave" : "Your home is secured",
        icon: isLocked ? <LockOpen className="w-4 h-4" /> : <Lock className="w-4 h-4" />,
      });
    }, 300);
  };

  return (
    <button 
      onClick={handleToggle}
      disabled={isAnimating}
      className={`rounded-2xl p-5 shadow-sm h-36 flex flex-col justify-between text-left transition-all duration-300 w-full ${
        isAnimating ? 'scale-95 opacity-80' : ''
      }`}
      style={{ 
        background: isLocked 
          ? 'linear-gradient(135deg, hsl(350 55% 65%) 0%, hsl(0 60% 55%) 100%)' 
          : 'linear-gradient(135deg, hsl(145 55% 45%) 0%, hsl(160 50% 50%) 100%)'
      }}
    >
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
          {isLocked ? (
            <Lock className="w-5 h-5 text-white" />
          ) : (
            <LockOpen className="w-5 h-5 text-white" />
          )}
        </div>
        <Shield className="w-5 h-5 text-white/50" />
      </div>
      
      <div>
        <p className="text-sm text-white/80">Front Door</p>
        <p className="text-lg font-semibold text-white">
          {isLocked ? "Locked" : "Unlocked"}
        </p>
        <p className="text-sm text-white/80">Tap to {isLocked ? "unlock" : "lock"}</p>
      </div>
    </button>
  );
};