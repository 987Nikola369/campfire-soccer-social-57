import { Card } from "@/components/ui/card";
import AuthForm from "@/components/AuthForm";
import NewsFeed from "@/components/NewsFeed";
import { useAuth } from "@/lib/auth";

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#E41E12]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6 animate-fade-in bg-[#1a1d21]/90 backdrop-blur-lg border-none">
          <img 
            src="/src/assets/images/logo.png" 
            alt="Logo" 
            className="h-12 mx-auto mb-6"
          />
          <AuthForm />
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full animate-fade-in">
      <NewsFeed />
    </div>
  );
};

export default Index;