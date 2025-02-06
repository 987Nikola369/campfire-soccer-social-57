import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import Index from "./pages/Index";
import Profile from "./components/Profile";
import Messages from "./components/Messages";
import Academy from "./pages/Academy";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={new QueryClient()}>
      <TooltipProvider>
        <AuthProvider>
          <div 
            className="min-h-screen bg-[#231F20]"
            style={{
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
            }}
          >
            <div id="particles-js" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}></div>
            <div className="min-h-screen bg-black/50 backdrop-blur-sm relative z-10">
              <Header />
              <main className="pt-20 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } />
                    <Route path="/messages" element={
                      <ProtectedRoute>
                        <Messages />
                      </ProtectedRoute>
                    } />
                    <Route path="/academy" element={
                      <ProtectedRoute>
                        <Academy />
                      </ProtectedRoute>
                    } />
                  </Routes>
                </div>
              </main>
              <BottomNav />
            </div>
          </div>
          <Toaster />
          <Sonner />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;