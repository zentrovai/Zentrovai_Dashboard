import { CheckCircle2, Database, RefreshCcw, ShieldCheck } from "lucide-react";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";

const sources = [
  { name: "Salesforce CRM", status: "Healthy", latency: "1.2 min" },
  { name: "Google Analytics", status: "Syncing", latency: "3.8 min" },
  { name: "NetSuite Finance", status: "Healthy", latency: "54 sec" },
  { name: "HubSpot Marketing", status: "Review", latency: "8.1 min" },
];

const DashboardDataSources = () => {
  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Data Sources"
        description="Monitor every connected system feeding your centralized intelligence layer."
        badge="47 connected streams"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard title="Connected Apps" value="47" detail="active integrations" icon={Database} />
        <DashboardStatCard title="Healthy Streams" value="39" detail="within SLA" icon={CheckCircle2} />
        <DashboardStatCard title="Resync Queue" value="05" detail="needs review" icon={RefreshCcw} />
        <DashboardStatCard title="Compliance" value="99.2%" detail="policy aligned" icon={ShieldCheck} />
      </div>

      <DashboardPanel title="Source Registry" description="Connection state, freshness, and review priority." icon={Database}>
        <div className="grid gap-3">
          {sources.map((source) => (
            <div key={source.name} className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-card/70 p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-medium">{source.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">Latency: {source.latency}</p>
              </div>
              <span className="inline-flex w-fit items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                {source.status}
              </span>
            </div>
          ))}
        </div>
      </DashboardPanel>
    </div>
  );
};

export default DashboardDataSources;