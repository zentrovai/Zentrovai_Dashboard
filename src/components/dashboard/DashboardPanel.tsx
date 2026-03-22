import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface DashboardPanelProps {
  title: string;
  description: string;
  icon: LucideIcon;
  children: ReactNode;
}

export const DashboardPanel = ({ title, description, icon: Icon, children }: DashboardPanelProps) => {
  return (
    <section className="glass-panel rounded-2xl p-5">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-accent/10">
          <Icon className="h-4.5 w-4.5 text-accent-foreground" />
        </div>
      </div>
      {children}
    </section>
  );
};