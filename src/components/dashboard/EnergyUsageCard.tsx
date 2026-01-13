import { MoreHorizontal, TrendingUp, TrendingDown, Zap } from "lucide-react";
import { useState } from "react";

export const EnergyUsageCard = () => {
  const [todayUsage] = useState(30.7);
  const [monthUsage] = useState(235.37);
  const [todayTrend] = useState<'up' | 'down'>('down');
  const [monthTrend] = useState<'up' | 'down'>('up');
  const [todayCost] = useState(6.14);
  const [monthCost] = useState(47.07);

  return (
    <div className="rounded-2xl p-5 text-white shadow-lg gradient-primary">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5" />
          <h3 className="text-xl font-semibold">Energy Usage</h3>
        </div>
        <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      
      <div className="w-full h-px bg-white/30 mb-4" />
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-xl p-3">
          <span className="text-sm opacity-90">Today</span>
          <div className="flex items-center gap-1 mt-1">
            {todayTrend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="text-xl font-semibold">{todayUsage} kWh</span>
          </div>
          <span className="text-sm opacity-75">${todayCost}</span>
        </div>
        
        <div className="bg-white/10 rounded-xl p-3">
          <span className="text-sm opacity-90">This month</span>
          <div className="flex items-center gap-1 mt-1">
            {monthTrend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="text-xl font-semibold">{monthUsage} kWh</span>
          </div>
          <span className="text-sm opacity-75">${monthCost}</span>
        </div>
      </div>
    </div>
  );
};