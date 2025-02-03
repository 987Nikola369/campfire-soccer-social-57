import { Card } from "@/components/ui/card";
import NewsFeed from "@/components/NewsFeed";
import { useAuth } from "@/lib/auth";

const Academy = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <NewsFeed />
    </div>
  );
};

export default Academy;