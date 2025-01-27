import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Users, MessageSquare, Bell, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import Profile from "./components/Profile";
import Messages from "./components/Messages";
import Academy from "./pages/Academy";
import { Notification } from "@/types/post";

const Header = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [avatarImage, setAvatarImage] = useState<string | null>(null);

  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      const parsedNotifications = JSON.parse(savedNotifications);
      // Get last 10 notifications
      setNotifications(parsedNotifications.slice(0, 10));
    }

    const savedAvatarImage = localStorage.getItem('avatarImage');
    if (savedAvatarImage) {
      setAvatarImage(savedAvatarImage);
    }
  }, []);

  const handleNotificationClick = (notification: Notification) => {
    // Navigate to the relevant post/comment
    switch (notification.type) {
      case 'like':
      case 'comment':
        navigate(`/post/${notification.postId}`);
        break;
      case 'reply':
        navigate(`/post/${notification.postId}#comment-${notification.id}`);
        break;
    }
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#1a1d21]/95 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <img src="/lovable-uploads/1621746e-2299-451a-9e17-01589d3389cf.png" alt="Logo" className="h-8" />
        <div className="flex items-center gap-6">
          <a href="/" className="text-white/70 hover:text-white transition-colors">
            <Users className="h-5 w-5" />
          </a>
          <a href="/academy" className="text-white/70 hover:text-white transition-colors">
            <MessageSquare className="h-5 w-5" />
          </a>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="text-white/70 hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-[#1a1d21] border-white/10">
              {notifications.length === 0 ? (
                <DropdownMenuItem className="text-white/70">
                  No notifications
                </DropdownMenuItem>
              ) : (
                notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className="flex items-center gap-3 p-3 text-white/70 hover:text-white cursor-pointer"
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex-1">
                      <p className="text-sm">{notification.actorName} {notification.type === 'like' ? 'liked' : notification.type === 'comment' ? 'commented on' : 'replied to'} your post</p>
                      <p className="text-xs text-white/50">{new Date(notification.createdAt).toLocaleString()}</p>
                    </div>
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <a href="/profile" className="text-[#E41E12] hover:text-[#ff2a1f] transition-colors">
            <Avatar className="h-8 w-8">
              {avatarImage ? (
                <AvatarImage src={avatarImage} alt="Profile" />
              ) : (
                <AvatarFallback>NI</AvatarFallback>
              )}
            </Avatar>
          </a>

          <DropdownMenu>
            <DropdownMenuTrigger className="text-white/70 hover:text-white transition-colors">
              <ChevronDown className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#1a1d21] border-white/10">
              <DropdownMenuItem 
                onClick={handleLogout}
                className="text-white/70 hover:text-white cursor-pointer"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

const App = () => (
  <QueryClientProvider client={new QueryClient()}>
    <TooltipProvider>
      <div className="min-h-screen bg-[#231F20]">
        <Header />
        <main className="pt-20 px-4">
          <div className="max-w-4xl mx-auto">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/academy" element={<Academy />} />
            </Routes>
          </div>
        </main>
      </div>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;