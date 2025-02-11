import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent, mode: "login" | "register") => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (mode === "login") {
        await signIn(email, password);
      } else {
        if (!username) {
          throw new Error("Username is required");
        }
        await signUp(email, password, username);
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: error.message || "An error occurred during authentication",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tabs defaultValue="login" className="w-full animate-in fade-in duration-700 ease-in-out">
      <TabsList className="grid w-full grid-cols-2 mb-6 bg-[#2a2d31] backdrop-blur-lg">
        <TabsTrigger value="login" className="transition-colors ease-in-out">Login</TabsTrigger>
        <TabsTrigger value="register" className="transition-colors ease-in-out">Register</TabsTrigger>
      </TabsList>

      <TabsContent value="login" className="animate-in fade-in duration-700 ease-in-out">
        <form onSubmit={(e) => handleSubmit(e, "login")} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#2a2d31] backdrop-blur-lg border-none"
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#2a2d31] backdrop-blur-lg border-none"
            required
          />
          <Button type="submit" className="w-full bg-[#E41E12] hover:bg-[#E41E12]/80 transition-colors ease-in-out" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>
      </TabsContent>

      <TabsContent value="register" className="animate-in fade-in duration-700 ease-in-out">
        <form onSubmit={(e) => handleSubmit(e, "register")} className="space-y-4">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-[#2a2d31] backdrop-blur-lg border-none"
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#2a2d31] backdrop-blur-lg border-none"
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#2a2d31] backdrop-blur-lg border-none"
            required
            minLength={6}
          />
          <Button type="submit" className="w-full bg-[#E41E12] hover:bg-[#E41E12]/80 transition-colors ease-in-out" disabled={isLoading}>
            {isLoading ? "Loading..." : "Register"}
          </Button>
        </form>
      </TabsContent>

      <div className="mt-6">
        <Button variant="outline" className="w-full hover:bg-white/10 transition-colors ease-in-out" disabled={isLoading}>
          <Mail className="mr-2 h-4 w-4" />
          Continue with Google
        </Button>
      </div>
    </Tabs>
  );
};

export default AuthForm;
