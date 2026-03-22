import { useEffect, useMemo, useState } from "react";
import { Bell, Lock, Palette, Save, Settings, UserRound } from "lucide-react";
import { getAuth, onAuthStateChanged, updateEmail, updateProfile, type User } from "firebase/auth";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { firebaseApp, isFirebaseConfigured } from "@/lib/firebase";

const preferences = [
  { title: "Theme mode", detail: "Light and dark appearance controls", icon: Palette },
  { title: "Notifications", detail: "Executive alerts and digest frequency", icon: Bell },
  { title: "Access rules", detail: "Permissions and workspace governance", icon: Lock },
];

const DashboardSettings = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!firebaseApp || !isFirebaseConfigured) {
      return;
    }

    const auth = getAuth(firebaseApp);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      if (!user) {
        setFirstName("");
        setLastName("");
        setEmail("");
        return;
      }

      const [first = "", ...rest] = (user.displayName ?? "").trim().split(" ").filter(Boolean);
      setFirstName(first);
      setLastName(rest.join(" "));
      setEmail(user.email ?? "");
    });

    return unsubscribe;
  }, []);

  const fullName = useMemo(() => [firstName, lastName].filter(Boolean).join(" ").trim(), [firstName, lastName]);

  const handleSave = async () => {
    if (!firebaseApp || !isFirebaseConfigured || !currentUser) {
      toast({
        title: "Profile unavailable",
        description: "Sign in first to edit your profile.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      if (fullName !== (currentUser.displayName ?? "")) {
        await updateProfile(currentUser, { displayName: fullName });
      }

      if (email && email !== (currentUser.email ?? "")) {
        await updateEmail(currentUser, email);
      }

      toast({
        title: "Profile updated",
        description: "Your settings have been saved.",
      });
    } catch (error) {
      toast({
        title: "Could not save profile",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        title="Settings"
        description="Manage workspace preferences, governance controls, and user-facing experience options."
        badge="Workspace controls"
      />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <DashboardPanel title="Profile Details" description="Update the core account details used across your workspace." icon={UserRound}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input
                id="first-name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                placeholder="Enter first name"
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                id="last-name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                placeholder="Enter last name"
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@company.com"
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 border-t border-border/60 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Changes update your Firebase account profile.
            </p>
            <Button onClick={handleSave} disabled={isSaving} className="rounded-xl">
              <Save className="h-4 w-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </DashboardPanel>

        <DashboardPanel title="Preference Center" description="High-level settings categories for your intelligence workspace." icon={Settings}>
          <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-1">
            {preferences.map(({ title, detail, icon: Icon }) => (
              <div key={title} className="rounded-2xl border border-border/60 bg-card/70 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon className="h-4.5 w-4.5 text-primary" />
                </div>
                <h3 className="mt-4 font-medium">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{detail}</p>
              </div>
            ))}
          </div>
        </DashboardPanel>
      </div>
    </div>
  );
};

export default DashboardSettings;