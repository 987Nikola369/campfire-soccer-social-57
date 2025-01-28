import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import Routes from "./Routes";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes />
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;