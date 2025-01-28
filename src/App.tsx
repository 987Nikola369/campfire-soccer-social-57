import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import Routes from "./Routes";

function App() {
  return (
    <AuthProvider>
      <div className="dark">
        <Routes />
        <Toaster />
      </div>
    </AuthProvider>
  );
}

export default App;