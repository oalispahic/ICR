import { TrendingUp, TrendingDown, Zap, Droplets, Flame, Download } from "lucide-react";
import { BottomNav } from "@/components/dashboard/BottomNav";
import { useState, useEffect } from "react";
import { 
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar, Tooltip
} from "recharts";

interface UsageStat {
  id: string;
  name: string;
  icon: typeof Zap;
  currentUsage: number;
  unit: string;
  cost: number;
  trend: 'up' | 'down';
  change: number;
  color: string;
  chartData: { name: string; value: number }[];
}

const StatsAndBills = () => {
  const [stats, setStats] = useState<UsageStat[]>([
    { 
      id: 'electricity', 
      name: 'Electricity', 
      icon: Zap, 
      currentUsage: 235.4, 
      unit: 'kWh', 
      cost: 47.08, 
      trend: 'up', 
      change: 12,
      color: 'hsl(45, 90%, 55%)',
      chartData: [
        { name: 'Mon', value: 32 },
        { name: 'Tue', value: 28 },
        { name: 'Wed', value: 35 },
        { name: 'Thu', value: 30 },
        { name: 'Fri', value: 38 },
        { name: 'Sat', value: 42 },
        { name: 'Sun', value: 30 },
      ]
    },
    { 
      id: 'water', 
      name: 'Water', 
      icon: Droplets, 
      currentUsage: 4520, 
      unit: 'L', 
      cost: 22.60, 
      trend: 'down', 
      change: 8,
      color: 'hsl(200, 80%, 55%)',
      chartData: [
        { name: 'Mon', value: 580 },
        { name: 'Tue', value: 620 },
        { name: 'Wed', value: 540 },
        { name: 'Thu', value: 690 },
        { name: 'Fri', value: 720 },
        { name: 'Sat', value: 800 },
        { name: 'Sun', value: 570 },
      ]
    },
    { 
      id: 'gas', 
      name: 'Gas', 
      icon: Flame, 
      currentUsage: 45.2, 
      unit: 'm³', 
      cost: 31.64, 
      trend: 'up', 
      change: 5,
      color: 'hsl(15, 80%, 55%)',
      chartData: [
        { name: 'Mon', value: 6.2 },
        { name: 'Tue', value: 5.8 },
        { name: 'Wed', value: 7.1 },
        { name: 'Thu', value: 6.5 },
        { name: 'Fri', value: 6.8 },
        { name: 'Sat', value: 7.2 },
        { name: 'Sun', value: 5.6 },
      ]
    },
  ]);

  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  const totalCost = stats.reduce((acc, s) => acc + s.cost, 0);

  // Pie chart data for distribution
  const pieData = stats.map(s => ({
    name: s.name,
    value: s.cost,
    color: s.color,
  }));

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <div className="px-5 pt-10 pb-4">
        <h1 className="text-2xl font-semibold text-foreground">Stats & Bills</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Track your utility usage</p>
      </div>

      <div className="flex-1 px-5 space-y-4 overflow-y-auto">
        {/* Period Selector */}
        <div className="flex gap-2 bg-card rounded-full p-1 card-shadow">
          {(['week', 'month', 'year'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`flex-1 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                selectedPeriod === period
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        {/* Total Cost Card with Pie Chart */}
        <div className="bg-card rounded-2xl p-5 card-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total this {selectedPeriod}</p>
              <p className="text-4xl font-semibold text-foreground mt-1">${totalCost.toFixed(2)}</p>
              <div className="flex items-center gap-1 mt-2 text-accent">
                <TrendingDown className="w-4 h-4" />
                <span className="text-sm font-medium">5% less than last {selectedPeriod}</span>
              </div>
            </div>
            
            {/* Mini Pie Chart */}
            <div className="w-24 h-24">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={28}
                    outerRadius={40}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-border">
            {stats.map(stat => (
              <div key={stat.id} className="flex items-center gap-2">
                <span 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: stat.color }}
                />
                <span className="text-xs text-muted-foreground">{stat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Individual Stats with Charts */}
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className="bg-card rounded-2xl p-4 card-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">{stat.name}</h3>
                    <p className="text-muted-foreground text-xs">
                      {stat.currentUsage.toLocaleString()} {stat.unit}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-foreground">${stat.cost.toFixed(2)}</p>
                  <div className={`flex items-center gap-1 text-xs ${
                    stat.trend === 'up' ? 'text-destructive' : 'text-accent'
                  }`}>
                    {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {stat.change}%
                  </div>
                </div>
              </div>
              
              {/* Bar Chart */}
              <div className="h-16 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stat.chartData} barSize={16}>
                    <Bar 
                      dataKey="value" 
                      fill={stat.color}
                      radius={[4, 4, 0, 0]}
                      opacity={0.8}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                      formatter={(value: number) => [`${value} ${stat.unit}`, stat.name]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}

        {/* Download Bill Button */}
        <button className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-medium flex items-center justify-center gap-2">
          <Download className="w-5 h-5" />
          Download Full Bill
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default StatsAndBills;