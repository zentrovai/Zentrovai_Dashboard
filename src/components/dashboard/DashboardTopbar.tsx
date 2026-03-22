import { Search, Moon, Sun, Menu, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { User as FirebaseUser, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { firebaseApp, isFirebaseConfigured } from "@/lib/firebase";

interface Props {
  onToggleSidebar: () => void;
}

const searchItems = [
  { name: "Overview", path: "/dashboard" },
  { name: "Analytics", path: "/dashboard/analytics" },
  { name: "Data Sources", path: "/dashboard/data-sources" },
  { name: "AI Insights", path: "/dashboard/ai-insights" },
  { name: "Reports", path: "/dashboard/reports" },
  { name: "Performance", path: "/dashboard/performance" },
];

export const DashboardTopbar = ({ onToggleSidebar }: Props) => {
  const [isDark, setIsDark] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(searchItems);

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    if (!firebaseApp || !isFirebaseConfigured) return;

    const unsubscribe = onAuthStateChanged(getAuth(firebaseApp), (nextUser) => {
      setUser(nextUser);
    });

    return unsubscribe;
  }, []);

  // 🔍 Filter search results
  useEffect(() => {
    const results = searchItems.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(results);
  }, [query]);

  const handleNavigate = (path: string) => {
    navigate(path);
    setQuery(""); // clear search
  };

  const handleLogout = async () => {
    try {
      if (firebaseApp && isFirebaseConfigured) {
        await signOut(getAuth(firebaseApp));
      }

      toast({
        title: "Logged out",
        description: "You have been signed out successfully.",
      });

      navigate("/auth");
    } catch (error) {
      toast({
        title: "Logout failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  const displayName = user?.displayName?.trim() || "Workspace user";
  const initials =
    displayName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "ZU";

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-sidebar-border bg-sidebar px-4 text-sidebar-foreground shadow-lg sm:px-6">
      
      {/* LEFT */}
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <button onClick={onToggleSidebar} className="lg:hidden text-sidebar-foreground/70 hover:text-sidebar-foreground">
          <Menu className="w-5 h-5" />
        </button>

        {/* 🔍 SEARCH */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sidebar-foreground/60" />
          
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="h-9 w-56 rounded-xl border-sidebar-border bg-sidebar-accent/80 pl-9 text-sm lg:w-72"
          />

          {/* Dropdown */}
          {query && (
            <div className="absolute top-11 w-full rounded-xl bg-sidebar border border-sidebar-border shadow-lg z-50">
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => handleNavigate(item.path)}
                    className="cursor-pointer px-4 py-2 text-sm hover:bg-sidebar-accent transition"
                  >
                    {item.name}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-muted-foreground">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">
        {/* Dark Mode */}
        <Button variant="ghost" size="icon" onClick={() => setIsDark(!isDark)}>
          {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
        </Button>

        {/* User Info */}
        <div className="hidden md:flex items-center gap-3 bg-sidebar-accent px-3 py-2 rounded-xl">
          <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-sidebar text-accent font-semibold">
            {initials}
          </div>
          <div>
            <p className="text-sm">{displayName}</p>
            <p className="text-xs text-muted-foreground">{user?.email ?? "Not connected"}</p>
          </div>
        </div>

        {/* Mobile Icon */}
        <div className="md:hidden h-9 w-9 flex items-center justify-center rounded-xl bg-sidebar-accent">
          <User className="w-4.5 h-4.5" />
        </div>

        {/* Logout */}
        <Button variant="ghost" onClick={handleLogout}>
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
};