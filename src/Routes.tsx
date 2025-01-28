import { Routes as RouterRoutes, Route } from "react-router-dom";
import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Home, Users } from "lucide-react";
import Index from "@/pages/Index";
import Academy from "@/pages/Academy";
import { useAuth } from "@/contexts/AuthContext";

const Routes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <SidebarProvider defaultOpen>
      <div className="grid grid-cols-1 md:grid-cols-[auto,1fr]">
        {isAuthenticated && (
          <Sidebar>
            <SidebarContent>
              <nav className="space-y-2 p-2">
                <a
                  href="/"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  <Home className="h-4 w-4" />
                  <span>Academy Feed</span>
                </a>
                <a
                  href="/community"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  <Users className="h-4 w-4" />
                  <span>Community</span>
                </a>
              </nav>
            </SidebarContent>
          </Sidebar>
        )}
        <SidebarInset className="p-4">
          <RouterRoutes>
            <Route path="/" element={<Academy />} />
            <Route path="/community" element={<Index />} />
          </RouterRoutes>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Routes;