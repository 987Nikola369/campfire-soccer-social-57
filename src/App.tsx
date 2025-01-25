import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, MessageSquare, Bell, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Index from "./pages/Index";
import Profile from "./components/Profile";
import Messages from "./components/Messages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="min-h-screen bg-[#231F20]">
        <header className="fixed top-0 w-full z-50 bg-[#1a1d21]/95 backdrop-blur-lg border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <img src="/lovable-uploads/1621746e-2299-451a-9e17-01589d3389cf.png" alt="Logo" className="h-8" />
            <div className="flex items-center gap-6">
              <a href="/" className="text-white/70 hover:text-white transition-colors">
                <Home className="h-5 w-5" />
              </a>
              <a href="/messages" className="text-white/70 hover:text-white transition-colors">
                <MessageSquare className="h-5 w-5" />
              </a>
              <a href="/notifications" className="text-white/70 hover:text-white transition-colors">
                <Bell className="h-5 w-5" />
              </a>
              <a href="/profile" className="text-[#E41E12] hover:text-[#ff2a1f] transition-colors">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>NI</AvatarFallback>
                </Avatar>
              </a>
              <button className="text-white/70 hover:text-white transition-colors">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>
        
        <main className="pt-20 px-4">
          <div className="max-w-4xl mx-auto">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/messages" element={<Messages />} />
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