import { Home, Sliders, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Dashboard", path: "/home" },
  { icon: Sliders, label: "Control", path: "/control" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-card rounded-full shadow-lg px-8 py-3 border border-border">
      <nav className="flex items-center gap-8">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 transition-all ${
                isActive 
                  ? "text-primary scale-110" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'drop-shadow-sm' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};