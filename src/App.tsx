import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import Routes from "./Routes";

function App() {
  return (
    <AuthProvider>
      <Routes />
      <Toaster />
    </AuthProvider>
  );
}

export default App;