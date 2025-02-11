import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "./store/authStore";
import useLocalDatabase from "./localDatabase";

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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const authStore = useAuthStore();
  const localDatabase = useLocalDatabase();

  useEffect(() => {
    const handleAuthChange = (event: CustomEvent) => {
      const { event: eventType, session } = event.detail;
      console.log("Auth state changed:", eventType, session);

      if (eventType === 'SIGNED_OUT') {
        navigate('/');
      }
      setLoading(false);
    };

    window.addEventListener('local-auth-change', handleAuthChange as EventListener);
    setLoading(false);

    return () => {
      window.removeEventListener('local-auth-change', handleAuthChange as EventListener);
    };
  }, [navigate]);

  const signUp = async (email: string, password: string, username: string) => {
    try {
      const mockUser: AuthUser = {
        id: uuidv4(),
        email,
        username
      };

      // Create the profile using the local database
      await localDatabase.createProfile({
        id: mockUser.id,
        username: username,
        full_name: username,
      });

      authStore.signUp(mockUser);

      toast({
        title: "Success!",
        description: "Account created successfully.",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await authStore.signIn(email, password);
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
      await authStore.signOut();
      navigate('/');
    } catch (error: any) {
      console.error("Error during sign out:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
      navigate('/');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user: authStore.currentUser, 
      loading, 
      signIn, 
      signUp, 
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
