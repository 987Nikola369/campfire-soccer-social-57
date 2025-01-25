import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

interface AuthFormProps {
  onSuccess: () => void;
}

const AuthForm = ({ onSuccess }: AuthFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement actual authentication
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
      toast({
        title: "Welcome!",
        description: "You have successfully logged in.",
      });
    }, 1000);
  };

  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>

      <TabsContent value="login" className="animate-fade-in">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="email" placeholder="Email" className="bg-white/10" />
          <Input type="password" placeholder="Password" className="bg-white/10" />
          <Button type="submit" className="w-full bg-[#E41E12] hover:bg-[#E41E12]/80" disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </Button>
          <Button type="button" variant="outline" className="w-full mt-2 hover:bg-white/10">
            Continue with Google
          </Button>
        </form>
      </TabsContent>

      <TabsContent value="register" className="animate-fade-in">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="text" placeholder="Full Name" className="bg-white/10" />
          <Input type="email" placeholder="Email" className="bg-white/10" />
          <Input type="password" placeholder="Password" className="bg-white/10" />
          <Button type="submit" className="w-full bg-[#E41E12] hover:bg-[#E41E12]/80" disabled={isLoading}>
            {isLoading ? "Loading..." : "Register"}
          </Button>
          <Button type="button" variant="outline" className="w-full mt-2 hover:bg-white/10">
            Continue with Google
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  );
};

export default AuthForm;