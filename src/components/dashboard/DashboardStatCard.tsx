import { LucideIcon } from "lucide-react";

interface DashboardStatCardProps {
  title: string;
  value: string;
  detail: string;
  icon: LucideIcon;
}

export const DashboardStatCard = ({ title, value, detail, icon: Icon }: DashboardStatCardProps) => {
  return (
    <div className="glass-panel rounded-2xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">{detail}</span>
      </div>
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{title}</p>
      <p className="mt-2 text-3xl font-bold font-display">{value}</p>
    </div>
  );
};