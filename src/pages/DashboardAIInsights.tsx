import { Brain, Lightbulb, Radar, Sparkles } from "lucide-react";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";

const insights = [
  {
    title: "Upsell cluster emerging in high-retention accounts",
    detail: "AI detected expansion potential across 14 enterprise customers.",
  },
  {
    title: "Churn risk tied to onboarding delays",
    detail: "Operational handoff lag is the clearest early warning pattern this week.",
  },
  {
    title: "Budget reallocation can unlock higher ROAS",
    detail: "Model suggests shifting spend toward campaigns with stronger finance correlation.",
  },
];

const DashboardAIInsights = () => {
  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="AI Insights"
        description="Explore the patterns, risks, and opportunities uncovered by your intelligence engine."
        badge="Autonomous analysis"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard title="Insights Generated" value="1,847" detail="this month" icon={Brain} />
        <DashboardStatCard title="Actionable Signals" value="126" detail="high-confidence" icon={Sparkles} />
        <DashboardStatCard title="Opportunity Score" value="89/100" detail="growth weighted" icon={Lightbulb} />
        <DashboardStatCard title="Risk Watch" value="12" detail="active anomalies" icon={Radar} />
      </div>

      <DashboardPanel title="Recommended Actions" description="Human-readable intelligence summaries for faster decision making." icon={Brain}>
        <div className="space-y-3">
          {insights.map((insight) => (
            <article key={insight.title} className="rounded-2xl bg-muted/40 p-4">
              <h3 className="font-medium">{insight.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{insight.detail}</p>
            </article>
          ))}
        </div>
      </DashboardPanel>
    </div>
  );
};

export default DashboardAIInsights;