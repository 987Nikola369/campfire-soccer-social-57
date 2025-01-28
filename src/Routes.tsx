import { Routes as RouterRoutes, Route, useLocation } from "react-router-dom";
import { Home, Users, MessageSquare } from "lucide-react";
import Academy from "@/pages/Academy";
import Index from "@/pages/Index";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Routes = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navigation */}
      {isAuthenticated && (
        <header className="flex items-center justify-between px-4 py-2 bg-[#1a1d21]/90 backdrop-blur-lg border-b border-white/10">
          <h1 className="text-white font-semibold">Logo</h1>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-[#E41E12] text-white">NI</AvatarFallback>
          </Avatar>
        </header>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-[#1a1d21]">
        <RouterRoutes>
          <Route path="/" element={<Academy />} />
          <Route path="/community" element={<Index />} />
        </RouterRoutes>
      </div>

      {/* Bottom Navigation */}
      {isAuthenticated && (
        <nav className="flex items-center justify-around px-4 py-3 bg-[#1a1d21]/90 backdrop-blur-lg border-t border-white/10">
          <a 
            href="/" 
            className={`flex flex-col items-center ${location.pathname === '/' ? 'text-[#E41E12]' : 'text-white'}`}
          >
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </a>
          <a 
            href="/community" 
            className={`flex flex-col items-center ${location.pathname === '/community' ? 'text-[#E41E12]' : 'text-white'}`}
          >
            <Users className="h-6 w-6" />
            <span className="text-xs mt-1">Community</span>
          </a>
          <a 
            href="/messages" 
            className={`flex flex-col items-center ${location.pathname === '/messages' ? 'text-[#E41E12]' : 'text-white'}`}
          >
            <MessageSquare className="h-6 w-6" />
            <span className="text-xs mt-1">Messages</span>
          </a>
        </nav>
      )}
    </div>
  );
};

export default Routes;