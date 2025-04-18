import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { X, Loader2 } from 'lucide-react'; // Import X and Loader2 icons
import { supabase } from '@/lib/supabaseClient'; // Import supabase client
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth to check if already logged in

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth(); // Get auth state

  // Redirect if user is already logged in and auth state is loaded
  useEffect(() => {
    if (!isAuthLoading && isAuthenticated) {
      navigate('/'); // Redirect to homepage
    }
  }, [isAuthenticated, isAuthLoading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Call Supabase signInWithPassword
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.error('Supabase login error:', error.message);
        // Provide more specific error messages
        if (error.message === 'Invalid login credentials') {
          toast.error('Invalid email or password. Please try again.');
        } else if (error.message === 'Email not confirmed') {
           toast.error('Please confirm your email address before logging in.', { duration: 5000 });
        } else {
          toast.error(error.message || 'Login failed. Please try again.');
        }
      } else {
        // Login successful, AuthContext listener will handle session update
        toast.success('Login successful!');
        // The useEffect hook will handle redirection once the AuthContext updates
        // No need to navigate explicitly here
      }
    } catch (error) {
      console.error('Caught login error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      // Add a small delay before setting loading to false to allow state update/redirect
      // This can prevent the form reappearing briefly after successful login
      setTimeout(() => setIsLoading(false), 300); 
    }
  };

  const handleCancel = () => {
    if (!isLoading) {
      navigate(-1); 
    }
  };

  // Show a loading indicator full-page while checking initial auth state
  if (isAuthLoading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="h-8 w-8 animate-spin text-gold" />
        </div>
    );
  }

  // If user is already authenticated (and not loading), they should have been redirected
  // by the useEffect. Rendering null avoids a flash of the login form.
  if (isAuthenticated) {
      return null;
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)] bg-gradient-to-br from-gold-light/5 via-background to-background px-4 py-12">
      <Card className="w-full max-w-md relative shadow-lg border border-border/20">
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground z-10 disabled:opacity-50"
          onClick={handleCancel}
          aria-label="Close login form"
          disabled={isLoading}
        >
          <X className="h-5 w-5" />
        </Button>

        <CardHeader className="space-y-1 text-center pt-8 pb-4">
          <CardTitle className="text-2xl font-playfair font-semibold text-gold-dark">Welcome Back!</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {/* TODO: Implement Forgot Password page/modal */}
                <Link 
                  to="#" // Change to actual forgot password route later
                  tabIndex={isLoading ? -1 : 0} // Prevent tabbing when disabled
                  className={`text-sm underline ${isLoading ? 'text-muted-foreground pointer-events-none' : 'text-gold hover:text-gold-dark'}`}
                  aria-disabled={isLoading}
                  onClick={(e) => { 
                      if (isLoading) e.preventDefault(); 
                      else toast.info('Forgot password functionality coming soon!'); // Placeholder action
                  }}
                 >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gold hover:bg-gold-dark text-white font-medium py-3 flex items-center justify-center gap-2 disabled:opacity-75"
              disabled={isLoading}
            >
               {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
               {isLoading ? 'Logging In...' : 'Login'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm justify-center pt-4 pb-6">
          <span>Don't have an account?</span>
          <Link 
             to="/signup" 
             tabIndex={isLoading ? -1 : 0} // Prevent tabbing when disabled
             className={`font-medium ml-1.5 ${isLoading ? 'text-muted-foreground pointer-events-none' : 'text-gold hover:text-gold-dark underline'}`}
             aria-disabled={isLoading}
             onClick={(e) => { if (isLoading) e.preventDefault(); }}
           >
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
