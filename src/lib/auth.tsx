import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export type AuthUser = {
  id: string;
  email: string;
  username?: string;
};

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchProfile = async (userId: string) => {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    return profile;
  };

  const updateUserState = async (session: any) => {
    console.log("Updating user state with session:", session);
    if (session?.user) {
      const profile = await fetchProfile(session.user.id);
      setUser({
        id: session.user.id,
        email: session.user.email!,
        username: profile?.username || session.user.user_metadata?.username
      });
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Initial session check:", session);
        if (mounted) {
          await updateUserState(session);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error during session initialization:", error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    const { subscription } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      if (!mounted) return;

      if (event === 'SIGNED_OUT') {
        setUser(null);
        localStorage.clear();
        window.location.href = '/';
      } else {
        await updateUserState(session);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const signUp = async (email: string, password: string, username: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Please check your email to verify your account.",
      });
      
      navigate("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const profile = await fetchProfile(data.user.id);
      
      if (profile) {
        setUser({
          id: data.user.id,
          email: data.user.email!,
          username: profile.username
        });
      }

      toast({
        title: "Welcome back!",
      });
      
      navigate("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      console.log("Starting signOut process");
      
      // First, clear the local state
      setUser(null);
      localStorage.clear();
      
      // Then sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      console.log("Successfully signed out");
      
      // Force a full page reload to clear any remaining state
      window.location.href = '/';
    } catch (error: any) {
      console.error("Error during sign out:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
      // Even if there's an error, redirect to home
      window.location.href = '/';
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};