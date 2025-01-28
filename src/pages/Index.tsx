import { useState } from "react";
import { Card } from "@/components/ui/card";
import AuthForm from "@/components/AuthForm";
import NewsFeed from "@/components/NewsFeed";

const Index = () => {
  // Using localStorage to persist authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true" || false;
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#231F20] p-4">
        <Card className="w-full max-w-md p-6 animate-fade-in bg-black/30 backdrop-blur-lg border-none shadow-xl">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Soccer Camp Social</h1>
          <AuthForm onSuccess={handleLogin} />
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