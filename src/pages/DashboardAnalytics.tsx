import { Activity, BarChart3, LineChart, TrendingUp } from "lucide-react";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";

const channelBreakdown = [
  { name: "Revenue velocity", value: "+18.4%", detail: "vs last month" },
  { name: "Conversion health", value: "6.8%", detail: "cross-channel avg" },
  { name: "Attribution match", value: "94%", detail: "model confidence" },
];

const DashboardAnalytics = () => {
  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Analytics"
        description="Track business movement across channels, funnel stages, and predictive KPI trends."
        badge="Live intelligence"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard title="Pipeline Growth" value="+22.1%" detail="quarter to date" icon={TrendingUp} />
        <DashboardStatCard title="Signal Coverage" value="128" detail="monitored metrics" icon={Activity} />
        <DashboardStatCard title="Campaign ROI" value="4.6x" detail="blended return" icon={BarChart3} />
        <DashboardStatCard title="Forecast Lift" value="91%" detail="prediction accuracy" icon={LineChart} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <DashboardPanel title="Executive Summary" description="A concise view of what changed and why it matters now." icon={BarChart3}>
          <div className="grid gap-3">
            {channelBreakdown.map((item) => (
              <div key={item.name} className="rounded-2xl bg-muted/40 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
                  </div>
                  <p className="text-lg font-semibold font-display">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </DashboardPanel>

        <DashboardPanel title="Priority Signals" description="Signals worth immediate attention from your AI layer." icon={Activity}>
          <div className="space-y-3">
            {[
              "Paid acquisition efficiency improved after CRM sync cleanup.",
              "Finance forecasts indicate margin expansion in enterprise tier.",
              "Operations latency is suppressing conversion in two regions.",
            ].map((signal) => (
              <div key={signal} className="rounded-2xl border border-border/60 bg-card/60 p-4 text-sm text-muted-foreground">
                {signal}
              </div>
            ))}
          </div>
        </DashboardPanel>
      </div>
    </div>
  );
};

export default DashboardAnalytics;