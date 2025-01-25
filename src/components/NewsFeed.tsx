import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, MessageSquare, Share2 } from "lucide-react";

const NewsFeed = () => {
  return (
    <div className="space-y-6 py-4">
      <Card className="p-4 bg-black/30 backdrop-blur-lg border-none">
        <Input
          placeholder="What's on your mind?"
          className="bg-white/10 border-none"
        />
        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm" className="hover:bg-white/10">
            Photo
          </Button>
          <Button variant="outline" size="sm" className="hover:bg-white/10">
            Video
          </Button>
          <Button variant="outline" size="sm" className="hover:bg-white/10">
            Link
          </Button>
        </div>
      </Card>

      {/* Example Post */}
      <Card className="p-4 bg-black/30 backdrop-blur-lg border-none animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#E41E12]"></div>
          <div>
            <h3 className="font-semibold">John Doe</h3>
            <p className="text-sm text-gray-400">2 hours ago</p>
          </div>
        </div>
        <p className="mb-4">Great practice session today with the U12 team! 🎯⚽️</p>
        <div className="flex gap-4">
          <Button variant="ghost" size="sm" className="hover:bg-white/10">
            <Heart className="w-4 h-4 mr-2" />
            24
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-white/10">
            <MessageSquare className="w-4 h-4 mr-2" />
            12
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-white/10">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default NewsFeed;