import { Card } from "@/components/ui/card";
import AuthForm from "@/components/AuthForm";
import NewsFeed from "@/components/NewsFeed";
import LandingPage from "@/components/LandingPage";
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
    return <LandingPage />;
  }

  return (
    <div className="w-full animate-fade-in">
      <NewsFeed />
    </div>
  );
};

export default Index;
