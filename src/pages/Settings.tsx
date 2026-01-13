import { User, Moon, Bell, Shield, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { BottomNav } from "@/components/dashboard/BottomNav";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <h1 className="text-3xl font-semibold text-foreground">Settings</h1>
      </div>

      {/* Profile Section */}
      <div className="px-6 mb-6">
        <div className="bg-card rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center">
            <User className="w-7 h-7 text-accent-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">Mujo Mujic</h3>
            <p className="text-muted-foreground text-sm">mujo1@etf.unsa.ba</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>

      {/* Settings List */}
      <div className="px-6 space-y-3">
        {/* Appearance */}
        <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground font-medium">Dark Mode</span>
            </div>
            <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground font-medium">Notifications</span>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>
        </div>

        {/* Privacy */}
        <button className="bg-card rounded-2xl shadow-sm w-full p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-muted-foreground" />
            <span className="text-foreground font-medium">Privacy & Security</span>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Help */}
        <button className="bg-card rounded-2xl shadow-sm w-full p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-5 h-5 text-muted-foreground" />
            <span className="text-foreground font-medium">Help & Support</span>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>

        

        {/* Logout */}
        <button 
          onClick={handleLogout}
          className="bg-card rounded-2xl shadow-sm w-full p-4 flex items-center gap-3"
        >
          <LogOut className="w-5 h-5 text-destructive" />
          <span className="text-destructive font-medium">Log Out</span>
        </button>
    {/* About */}
        <div className="bg-card rounded-2xl shadow-sm w-full p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">i</span>
            </div>
            <span className="text-foreground font-medium">About</span>
          </div>
          <p className="text-muted-foreground text-sm text-center">
            Made by: Bakir Hadzialic, Elma dedic and Omar Alispahic.<br />
            Version 1.0.0 <br />
            © 2025 ETF ICR project.
          </p>
        </div>

      </div>

      <BottomNav />
    </div>
  );
};

export default Settings;