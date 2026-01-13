import { Flame, Home, Thermometer } from "lucide-react";

const SmartHomeIcons = () => {
  return (
    <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in">
      <div className="icon-box shadow-md" style={{ animationDelay: "0.1s" }}>
        <Flame size={28} strokeWidth={2} />
      </div>
      <div className="icon-box shadow-md" style={{ animationDelay: "0.2s" }}>
        <Home size={28} strokeWidth={2} />
      </div>
      <div className="icon-box shadow-md" style={{ animationDelay: "0.3s" }}>
        <Thermometer size={28} strokeWidth={2} />
      </div>
    </div>
  );
};

export default SmartHomeIcons;
