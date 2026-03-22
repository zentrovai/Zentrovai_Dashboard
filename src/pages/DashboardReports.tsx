import { CalendarRange, Download, FileText, FolderKanban } from "lucide-react";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";

const reports = [
  { title: "Board Intelligence Brief", schedule: "Every Monday · 08:00" },
  { title: "Pipeline Quality Snapshot", schedule: "Daily · 07:30" },
  { title: "Operational Drift Review", schedule: "Friday · 16:00" },
];

const DashboardReports = () => {
  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Reports"
        description="Package insights into polished executive reports and recurring stakeholder briefings."
        badge="12 scheduled exports"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardStatCard title="Scheduled Reports" value="12" detail="active automations" icon={CalendarRange} />
        <DashboardStatCard title="Exports Sent" value="284" detail="past 30 days" icon={Download} />
        <DashboardStatCard title="Templates" value="09" detail="customized" icon={FileText} />
        <DashboardStatCard title="Team Collections" value="04" detail="shared workspaces" icon={FolderKanban} />
      </div>

      <DashboardPanel title="Delivery Schedule" description="Recurring report outputs configured for leadership teams." icon={FileText}>
        <div className="grid gap-3 md:grid-cols-3">
          {reports.map((report) => (
            <div key={report.title} className="rounded-2xl border border-border/60 bg-card/70 p-4">
              <h3 className="font-medium">{report.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{report.schedule}</p>
            </div>
          ))}
        </div>
      </DashboardPanel>
    </div>
  );
};

export default DashboardReports;