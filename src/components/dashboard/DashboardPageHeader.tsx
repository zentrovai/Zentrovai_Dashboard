interface DashboardPageHeaderProps {
  title: string;
  description: string;
  badge?: string;
}

export const DashboardPageHeader = ({ title, description, badge }: DashboardPageHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>

      {badge ? (
        <span className="inline-flex w-fit items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent-foreground">
          {badge}
        </span>
      ) : null}
    </div>
  );
};