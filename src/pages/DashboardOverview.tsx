import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Activity,
  BarChart3,
  Brain,
  ArrowUpRight,
  Zap,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const stats = [
  { title: "Total Revenue", value: "$2.4M", change: "+12.5%", up: true, icon: DollarSign },
  { title: "Active Users", value: "18,249", change: "+8.2%", up: true, icon: Users },
  { title: "AI Predictions", value: "1,847", change: "+24.1%", up: true, icon: Brain },
  { title: "Data Sources", value: "47", change: "+3", up: true, icon: Activity },
];

const areaData = [
  { name: "Jan", revenue: 4000, predictions: 2400 },
  { name: "Feb", revenue: 3000, predictions: 1398 },
  { name: "Mar", revenue: 5000, predictions: 3800 },
  { name: "Apr", revenue: 4780, predictions: 3908 },
  { name: "May", revenue: 5890, predictions: 4800 },
  { name: "Jun", revenue: 6390, predictions: 3800 },
  { name: "Jul", revenue: 7490, predictions: 4300 },
];

const barData = [
  { name: "CRM", value: 85 },
  { name: "Analytics", value: 72 },
  { name: "Finance", value: 91 },
  { name: "Operations", value: 68 },
  { name: "Marketing", value: 79 },
];

const pieData = [
  { name: "Automated", value: 65 },
  { name: "Manual", value: 20 },
  { name: "Pending", value: 15 },
];
const pieColors = ["hsl(338, 85%, 30%)", "hsl(35, 60%, 58%)", "hsl(205, 97%, 15%)"];

const insights = [
  { title: "Revenue spike detected in Q2 pipeline", confidence: 94, type: "opportunity" },
  { title: "Customer churn risk increased 12% this week", confidence: 87, type: "risk" },
  { title: "Marketing ROI optimization available", confidence: 91, type: "action" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const DashboardOverview = () => {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <p className="text-muted-foreground text-sm mt-1">Real-time business intelligence at a glance</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/10 text-accent text-xs font-medium">
            <Zap className="w-3.5 h-3.5" /> AI Active
          </span>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.title} className="glass-panel rounded-2xl p-5 hover:shadow-xl transition-shadow group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <span className={`inline-flex items-center gap-1 text-xs font-semibold ${stat.up ? "text-emerald-500" : "text-red-500"}`}>
                {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold font-display">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.title}</p>
          </div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Area Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2 glass-panel rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold font-display">Revenue & Predictions</h3>
              <p className="text-xs text-muted-foreground">Monthly performance trend</p>
            </div>
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={areaData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(338, 85%, 30%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(338, 85%, 30%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPredictions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(35, 60%, 58%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(35, 60%, 58%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
              />
              <Area type="monotone" dataKey="revenue" stroke="hsl(338, 85%, 30%)" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
              <Area type="monotone" dataKey="predictions" stroke="hsl(35, 60%, 58%)" fillOpacity={1} fill="url(#colorPredictions)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div variants={itemVariants} className="glass-panel rounded-2xl p-5">
          <h3 className="font-semibold font-display mb-1">Decision Automation</h3>
          <p className="text-xs text-muted-foreground mb-4">Task distribution</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={5} dataKey="value">
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {pieData.map((item, i) => (
              <div key={item.name} className="flex items-center gap-1.5 text-xs">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pieColors[i] }} />
                <span className="text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Bar Chart */}
        <motion.div variants={itemVariants} className="glass-panel rounded-2xl p-5">
          <h3 className="font-semibold font-display mb-1">Data Source Health</h3>
          <p className="text-xs text-muted-foreground mb-4">Connection quality score</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "12px" }} />
              <Bar dataKey="value" fill="hsl(338, 85%, 30%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* AI Insights */}
        <motion.div variants={itemVariants} className="lg:col-span-2 glass-panel rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold font-display">AI-Generated Insights</h3>
              <p className="text-xs text-muted-foreground">Latest intelligence from your data</p>
            </div>
            <Brain className="w-4 h-4 text-accent" />
          </div>
          <div className="space-y-3">
            {insights.map((insight, i) => (
              <div key={i} className="flex items-center gap-4 p-3.5 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group cursor-pointer">
                <div className={`w-2 h-2 rounded-full shrink-0 ${
                  insight.type === "opportunity" ? "bg-emerald-500" : insight.type === "risk" ? "bg-red-400" : "bg-accent"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{insight.title}</p>
                  <p className="text-xs text-muted-foreground">Confidence: {insight.confidence}%</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardOverview;
