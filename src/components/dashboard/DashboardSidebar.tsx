import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BarChart3,
  Database,
  Brain,
  Settings,
  Users,
  FileText,
  Zap,
  ChevronLeft,
  TrendingUp,
} from "lucide-react";

const navItems = [
  { title: "Overview", icon: LayoutDashboard, path: "/dashboard" },
  { title: "Analytics", icon: BarChart3, path: "/dashboard/analytics" },
  { title: "Data Sources", icon: Database, path: "/dashboard/sources" },
  { title: "AI Insights", icon: Brain, path: "/dashboard/insights" },
  { title: "Reports", icon: FileText, path: "/dashboard/reports" },
  { title: "Performance", icon: TrendingUp, path: "/dashboard/performance" },

];

const bottomItems = [
  { title: "Settings", icon: Settings, path: "/dashboard/settings" },
];

interface Props {
  collapsed: boolean;
  mobile?: boolean;
  mobileOpen?: boolean;
  onNavigate?: () => void;
  onToggle: () => void;
}

export const DashboardSidebar = ({ collapsed, mobile = false, mobileOpen = false, onNavigate, onToggle }: Props) => {
  const location = useLocation();

  return (
    <motion.aside
      animate={mobile ? { x: mobileOpen ? 0 : -320 } : { width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`z-30 flex h-screen flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground shadow-2xl ${mobile
        ? "fixed inset-y-0 left-0 w-[280px]"
        : "sticky top-0"
        }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-sidebar-border/80">
        <div className="flex items-center gap-2.5 min-w-0">

          {/* Logo Image (No background, no box) */}
          <div className="shrink-0 flex items-center justify-center">
            <a
              href="https://zentrovai.com/"   // 🔁 replace with your URL
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <img
                src="/Logo.png"
                alt="ZentrovAI Logo"
                className="w-20 h-auto object-contain transition-transform duration-200 hover:scale-105"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${isActive
                ? "bg-sidebar-accent text-sidebar-foreground"
                : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/70"
                }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-accent"
                  transition={{ duration: 0.3 }}
                />
              )}
              <item.icon className={`w-5 h-5 shrink-0 ${isActive ? "text-accent" : "group-hover:text-sidebar-foreground"}`} />
              {!collapsed && <span className="truncate">{item.title}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="py-3 px-3 border-t border-sidebar-border/80 space-y-1">
        {bottomItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                ? "bg-sidebar-accent text-sidebar-foreground"
                : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/70"
                }`}
            >
              <item.icon className={`w-5 h-5 shrink-0 ${isActive ? "text-accent" : ""}`} />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          );
        })}

        {/* Collapse toggle */}
        <button
          onClick={onToggle}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/70 w-full transition-all duration-200"
        >
          <ChevronLeft className={`w-5 h-5 shrink-0 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`} />
          {!collapsed && <span>{mobile ? "Close" : "Collapse"}</span>}
        </button>
      </div>
    </motion.aside>
  );
};
