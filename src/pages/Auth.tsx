import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Zap } from "lucide-react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { firebaseApp, isFirebaseConfigured } from "@/lib/firebase";

const GoogleIcon = () => (
  <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
    <path
      d="M21.805 10.023h-9.18v3.955h5.27c-.227 1.272-.954 2.35-2.044 3.072v2.545h3.305c1.935-1.782 3.054-4.41 3.054-7.573 0-.678-.061-1.333-.174-1.999Z"
      fill="#4285F4"
    />
    <path
      d="M12.625 22c2.767 0 5.086-.916 6.78-2.478l-3.305-2.545c-.916.614-2.086.977-3.475.977-2.67 0-4.932-1.802-5.739-4.224H3.471v2.625A10.243 10.243 0 0 0 12.625 22Z"
      fill="#34A853"
    />
    <path
      d="M6.886 13.73a6.154 6.154 0 0 1-.321-1.93c0-.67.115-1.32.321-1.93V7.245H3.471a10.245 10.245 0 0 0 0 9.11l3.415-2.625Z"
      fill="#FBBC05"
    />
    <path
      d="M12.625 5.646c1.504 0 2.854.517 3.916 1.533l2.937-2.938C17.706 2.59 15.387 1.6 12.625 1.6A10.243 10.243 0 0 0 3.471 7.245L6.886 9.87c.807-2.422 3.069-4.224 5.739-4.224Z"
      fill="#EA4335"
    />
  </svg>
);

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGoogleAuth = async () => {
    if (!firebaseApp || !isFirebaseConfigured) {
      toast({
        title: "Firebase not configured",
        description: "Add your VITE_FIREBASE_* values first to enable Google sign-in.",
        variant: "destructive",
      });
      return;
    }

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });

      await signInWithPopup(getAuth(firebaseApp), provider);

      toast({
        title: isLogin ? "Signed in with Google" : "Google account connected",
        description: "Redirecting to your dashboard...",
      });

      navigate("/dashboard");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Google authentication failed.";

      toast({
        title: "Google sign-in failed",
        description: message,
        variant: "destructive",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just navigate to dashboard
    toast({
      title: isLogin ? "Welcome back!" : "Account created!",
      description: "Redirecting to your dashboard...",
    });
    setTimeout(() => navigate("/dashboard"), 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-secondary">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl float-animation" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-3xl float-animation-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--primary-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary-foreground)) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Logo */}
      {/* Logo */}
<motion.div
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
  className="text-center mb-8"
>
  <div className="inline-flex items-center justify-center gap-2 mb-3">
    
    {/* Logo Image */}
    <a
              href="https://zentrovai.com/"   // 🔁 replace with your URL
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
    <img
      src="/Logo.png"
      alt="Logo"
      className="w-16 md:w-20 lg:w-24 h-auto object-contain"
    />
</a>
  </div>

  {/* Tagline */}
  <p className="text-primary-foreground/60 text-sm">
    Centralized Business Intelligence Hub
  </p>
</motion.div>

        {/* Auth Card */}
        <div className="glass-panel-strong rounded-2xl p-8 glow-primary">
          {/* Tabs */}
          <div className="flex gap-1 p-1 rounded-xl bg-muted/50 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium font-display transition-all duration-300 ${
                isLogin ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium font-display transition-all duration-300 ${
                !isLogin ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign Up
            </button>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleAuth}
            className="mb-6 h-14 w-full rounded-2xl border-border/60 bg-background/30 text-foreground hover:bg-accent/40"
          >
            <GoogleIcon />
            <span>{isLogin ? "Continue with Google" : "Sign up with Google"}</span>
          </Button>

          <div className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-muted-foreground/70">
            <div className="h-px flex-1 bg-border/60" />
            <span>{isLogin ? "Or continue with email" : "Or sign up with email"}</span>
            <div className="h-px flex-1 bg-border/60" />
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground/80 text-sm">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 bg-muted/30 border-border/50 focus:border-primary/50 rounded-xl"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground/80 text-sm">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 bg-muted/30 border-border/50 focus:border-primary/50 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground/80 text-sm">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 bg-muted/30 border-border/50 focus:border-primary/50 rounded-xl pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="text-right">
                  <button type="button" className="text-xs text-primary hover:text-primary/80 transition-colors">
                    Forgot password?
                  </button>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-11 rounded-xl font-display font-semibold text-sm gradient-hero hover:opacity-90 transition-opacity text-primary-foreground border-0"
              >
                {isLogin ? "Sign In" : "Create Account"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.form>
          </AnimatePresence>

      
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
