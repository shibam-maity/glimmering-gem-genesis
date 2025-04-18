import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { X, Loader2 } from 'lucide-react'; // Import Loader2 for loading state
import { supabase } from '@/lib/supabaseClient'; // Import supabase client

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }
    if (!name.trim()) {
        toast.error('Name cannot be empty.');
        return;
    }

    setIsLoading(true); // Start loading

    try {
      // Call Supabase signUp
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          // Store the user's full name in the metadata
          data: {
            full_name: name.trim(),
          },
          // Optional: Specify a redirect URL after email confirmation
          // emailRedirectTo: `${window.location.origin}/`,
        }
      });

      if (error) {
        console.error('Supabase signup error:', error.message);
        // Provide more specific feedback if possible
        if (error.message.includes("User already registered")) {
            toast.error("An account with this email already exists.");
        } else if (error.message.includes("Password should be at least 6 characters")) {
            toast.error("Password must be at least 6 characters long."); // Should be caught above, but belts and braces
        } else {
            toast.error(error.message || 'Signup failed. Please try again.');
        }
      } else if (data.user) {
        // Check if email confirmation is required (default Supabase setting)
        // Supabase returns user data even if confirmation is needed
        if (data.session === null && data.user.email_confirmed_at === undefined) {
           toast.info('Signup successful! Please check your email to confirm your account.', { duration: 6000 });
           navigate('/login'); // Redirect to login page after showing info
        } else {
           // If email confirmation is disabled OR user is already confirmed (e.g., social login, magic link)
           // OR if Supabase automatically creates a session upon signup
           toast.success('Account created successfully!');
           navigate('/'); // Redirect to homepage or dashboard after successful signup/login
        }
      } else {
        // Handle unexpected cases where there's no error but no user/session data
        toast.error('An unexpected error occurred during signup. Please check your details and try again.');
      }

    } catch (error) {
      console.error('Caught signup error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading regardless of outcome
    }
  };

  const handleCancel = () => {
    if (!isLoading) { // Prevent cancelling while submitting
        navigate(-1);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)] bg-gradient-to-br from-gold-light/5 via-background to-background px-4 py-12">
      <Card className="w-full max-w-md relative shadow-lg border border-border/20">
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground z-10 disabled:opacity-50"
          onClick={handleCancel}
          aria-label="Close signup form"
          disabled={isLoading} // Disable cancel while loading
        >
          <X className="h-5 w-5" />
        </Button>
        
        <CardHeader className="space-y-1 text-center pt-8 pb-4">
          <CardTitle className="text-2xl font-playfair font-semibold text-gold-dark">Create an Account</CardTitle>
          <CardDescription>Enter your details to get started</CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <form onSubmit={handleSignup} className="space-y-4">
             <div className="space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your Name"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                placeholder="6+ characters"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                required
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gold hover:bg-gold-dark text-white font-medium py-3 flex items-center justify-center gap-2 disabled:opacity-75"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />} 
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm justify-center pt-4 pb-6">
          <span>Already have an account?</span>
           {/* Disable link while loading */}
          <Link 
            to="/login" 
            className={`font-medium ml-1.5 ${isLoading ? 'text-muted-foreground pointer-events-none' : 'text-gold hover:text-gold-dark underline'}`}
            aria-disabled={isLoading}
            onClick={(e) => { if (isLoading) e.preventDefault(); }} // Prevent navigation if loading
           >
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupPage;
