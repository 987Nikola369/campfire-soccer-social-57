import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, MessageSquare, Image } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";

const NewsFeed = () => {
  return (
    <div className="space-y-4 py-4">
      <Card className="p-4 bg-[#1a1d21]/90 backdrop-blur-lg border-none">
        <Input
          placeholder="Share something with the team..."
          className="bg-[#2a2d31] border-none text-gray-300 mb-4 h-24"
          multiline
        />
        <div className="flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-400 hover:text-white hover:bg-[#2a2d31] gap-2"
          >
            <Image className="w-5 h-5" />
            Add Media
          </Button>
          <Button 
            className="bg-[#E41E12] hover:bg-[#E41E12]/90 text-white px-6"
          >
            Post
          </Button>
        </div>
      </Card>

      {/* Example Posts */}
      <Card className="p-4 bg-[#1a1d21]/90 backdrop-blur-lg border-none">
        <div className="flex items-center gap-3 mb-4">
          <Avatar>
            <AvatarFallback className="bg-[#2a2d31] text-white">JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h3 className="font-semibold text-white">John Doe</h3>
            <p className="text-sm text-gray-400">2 hours ago</p>
          </div>
        </div>
        <p className="mb-4 text-gray-200">Great practice session today with the U12 team! 🎯⚽️</p>
        <div className="flex gap-4 text-gray-400">
          <Button variant="ghost" size="sm" className="hover:bg-[#2a2d31] gap-2">
            <Heart className="w-4 h-4" />
            24
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-[#2a2d31] gap-2">
            <MessageSquare className="w-4 h-4" />
            12
          </Button>
        </div>
      </Card>

      <Card className="p-4 bg-[#1a1d21]/90 backdrop-blur-lg border-none">
        <div className="flex items-center gap-3 mb-4">
          <Avatar>
            <AvatarFallback className="bg-[#2a2d31] text-white">MA</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h3 className="font-semibold text-white">Martin Anderson</h3>
            <p className="text-sm text-gray-400">3 hours ago</p>
          </div>
        </div>
        <p className="mb-4 text-gray-200">Just finished an amazing training session! The team is really coming together. 💪</p>
        <div className="flex gap-4 text-gray-400">
          <Button variant="ghost" size="sm" className="hover:bg-[#2a2d31] gap-2">
            <Heart className="w-4 h-4" />
            18
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-[#2a2d31] gap-2">
            <MessageSquare className="w-4 h-4" />
            8
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default NewsFeed;