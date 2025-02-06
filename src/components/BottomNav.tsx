import { useNavigate } from "react-router-dom";
import { Users, GraduationCap } from "lucide-react";
import { useAuth } from "@/lib/auth";

const BottomNav = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) return null;

  return (
    <nav className="sticky bottom-0 left-0 w-full z-50 bg-[#1a1d21]/90 backdrop-blur-lg border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-around">
        <a href="/" className="text-white/70 hover:text-white transition-colors">
          <Users className="h-5 w-5" />
        </a>
        <a href="/academy" className="text-white/70 hover:text-white transition-colors">
          <GraduationCap className="h-5 w-5" />
        </a>
        <a href="/directory" className="text-white/70 hover:text-white transition-colors">
          <Users className="h-5 w-5" />
        </a>
      </div>
    </nav>
  );
};

export default BottomNav;