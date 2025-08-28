import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Leaf, Eye, EyeOff } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signUp, signIn, resetPassword, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isResetPassword) {
        const { error } = await resetPassword(email);
        if (error) throw error;
        toast({
          title: "Reset link sent",
          description: "Check your email for password reset instructions.",
        });
        setIsResetPassword(false);
      } else if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) throw error;
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });
      } else {
        const { error } = await signUp(email, password, displayName);
        if (error) throw error;
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setDisplayName('');
    setIsResetPassword(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo and Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-2xl mb-6">
            <Leaf className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Plant Collection</h1>
        </div>

        {/* Auth Form */}
        <div className="space-y-6">
          {/* Form Title */}
          <div className="text-center">
            <h2 className="text-xl font-medium text-foreground mb-2">
              {isResetPassword ? 'Reset your password' : isLogin ? 'Welcome back' : 'Sign up'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {isResetPassword 
                ? 'Enter your email to receive reset instructions'
                : isLogin 
                ? 'Sign in to continue to your collection'
                : 'Create an account to get started'
              }
            </p>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && !isResetPassword && (
              <div className="space-y-1">
                <Input
                  id="displayName"
                  type="text"
                  placeholder="Display name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  className="h-12 bg-background border-border/50 focus:border-primary rounded-lg text-sm"
                />
              </div>
            )}
            
            <div className="space-y-1">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-background border-border/50 focus:border-primary rounded-lg text-sm"
              />
            </div>
            
            {!isResetPassword && (
              <div className="space-y-1 relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="h-12 bg-background border-border/50 focus:border-primary rounded-lg text-sm pr-12"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full h-12 bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-lg transition-colors" 
              disabled={loading}
            >
              {loading ? 'Please wait...' : isResetPassword ? 'Send Reset Link' : isLogin ? 'Sign In' : 'Sign Up'}
            </Button>
          </form>

          {/* Action Links */}
          <div className="space-y-4">
            {!isResetPassword && (
              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  className="text-sm text-muted-foreground hover:text-foreground p-0 h-auto"
                  onClick={() => setIsResetPassword(true)}
                >
                  Forgot password?
                </Button>
              </div>
            )}

            {/* Switch between login/signup */}
            {!isResetPassword && (
              <div className="flex items-center justify-center gap-1 py-4 border-t border-border/30">
                <span className="text-sm text-muted-foreground">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                </span>
                <Button
                  type="button"
                  variant="link"
                  className="text-sm font-medium text-primary p-0 h-auto hover:underline"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    resetForm();
                  }}
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </Button>
              </div>
            )}

            {isResetPassword && (
              <div className="text-center pt-4">
                <Button
                  type="button"
                  variant="link"
                  className="text-sm text-muted-foreground hover:text-foreground p-0 h-auto"
                  onClick={() => {
                    setIsResetPassword(false);
                    resetForm();
                  }}
                >
                  ← Back to sign in
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;