import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, User, Bell } from "lucide-react";
import AuthForm from "@/components/AuthForm";
import NewsFeed from "@/components/NewsFeed";
import Messages from "@/components/Messages";
import Notifications from "@/components/Notifications";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#231F20] p-4">
        <Card className="w-full max-w-md p-6 animate-fade-in bg-black/30 backdrop-blur-lg border-none shadow-xl">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Soccer Camp Social</h1>
          <AuthForm onSuccess={() => setIsAuthenticated(true)} />
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#231F20] text-white">
      <header className="border-b border-white/10 backdrop-blur-lg fixed top-0 w-full z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#E41E12]">Soccer Camp Social</h1>
          <Button variant="ghost" size="icon" className="hover:bg-white/10">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-20 pb-20">
        <Tabs defaultValue="feed" className="w-full">
          <TabsList className="w-full bg-black/30 backdrop-blur-lg">
            <TabsTrigger value="feed" className="flex-1">Feed</TabsTrigger>
            <TabsTrigger value="messages" className="flex-1">Messages</TabsTrigger>
            <TabsTrigger value="notifications" className="flex-1">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="feed" className="animate-fade-in">
            <NewsFeed />
          </TabsContent>
          <TabsContent value="messages" className="animate-fade-in">
            <Messages />
          </TabsContent>
          <TabsContent value="notifications" className="animate-fade-in">
            <Notifications />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;