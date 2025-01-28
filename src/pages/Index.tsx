import { useState } from "react";
import { Card } from "@/components/ui/card";
import AuthForm from "@/components/AuthForm";
import NewsFeed from "@/components/NewsFeed";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated, setUser } = useAuth();
  
  const handleLogin = () => {
    // When user logs in, we'll set their role
    const loggedInUser = {
      id: "current-user",
      email: "nikola@example.com",
      userName: "Nikola",
      role: "super_user" as const,
      joinDate: new Date().toISOString(),
    };
    setUser(loggedInUser);
    localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
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