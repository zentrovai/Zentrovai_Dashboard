import { Gauge, ServerCog, TimerReset, TrendingUp } from "lucide-react";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";

const checkpoints = [
  { label: "Model response time", value: "420ms" },
  { label: "Source sync uptime", value: "99.94%" },
  { label: "Decision refresh window", value: "5 min" },
  { label: "Insight delivery SLA", value: "98.7%" },
];

const DashboardPerformance = () => {
  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Performance"
        description="Measure platform speed, operational reliability, and decision system responsiveness."
        badge="System stable"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard title="Uptime" value="99.94%" detail="rolling 30 days" icon={Gauge} />
        <DashboardStatCard title="Model Speed" value="420ms" detail="median response" icon={TrendingUp} />
        <DashboardStatCard title="Sync Jobs" value="1.2k" detail="completed today" icon={ServerCog} />
        <DashboardStatCard title="Recovery Time" value="2.4m" detail="incident average" icon={TimerReset} />
      </div>

      <DashboardPanel title="Reliability Checkpoints" description="Key platform metrics for technical and executive monitoring." icon={Gauge}>
        <div className="grid gap-3 md:grid-cols-2">
          {checkpoints.map((checkpoint) => (
            <div key={checkpoint.label} className="rounded-2xl bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">{checkpoint.label}</p>
              <p className="mt-2 text-2xl font-bold font-display">{checkpoint.value}</p>
            </div>
          ))}
        </div>
      </DashboardPanel>
    </div>
  );
};

export default DashboardPerformance;