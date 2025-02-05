import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AcademyPost {
  id: string;
  content: string;
  imageUrl: string;
  createdAt: string;
}

const Academy = () => {
  const [posts] = useState<AcademyPost[]>([
    {
      id: "1",
      content: "Join us for our annual summer camp! This year we're focusing on developing technical skills and tactical understanding. Perfect for young players aged 8-16 who want to take their game to the next level.",
      imageUrl: "/lovable-uploads/photo-1517022812141-23620dba5c23.png",
      createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: "2",
      content: "Celebrating teamwork and unity! Our academy's philosophy is built on the foundation that success comes through collaboration. Just like these animals moving as one, our players learn to think and act as a team.",
      imageUrl: "/lovable-uploads/photo-1466721591366-2d5fba72006d.png",
      createdAt: new Date(Date.now() - 172800000).toISOString()
    },
    {
      id: "3",
      content: "The importance of coordination and precision in football cannot be overstated. Like these bees working in perfect harmony, our training sessions focus on developing these crucial skills.",
      imageUrl: "/lovable-uploads/photo-1498936178812-4b2e558d2937.png",
      createdAt: new Date(Date.now() - 259200000).toISOString()
    }
  ]);

  return (
    <div className="space-y-4 py-4 animate-fade-in">
      <h1 className="text-2xl font-bold text-white mb-6">Academy Updates</h1>
      {posts.map((post) => (
        <Card key={post.id} className="p-4 bg-[#1a1d21] border-none animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <Avatar>
              <AvatarFallback className="bg-[#2a2d31] text-white">
                AC
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h3 className="font-semibold text-white">Academy Staff</h3>
              <p className="text-sm text-gray-400">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <p className="mb-4 text-gray-200 break-words">{post.content}</p>
          
          <img 
            src={post.imageUrl} 
            alt="Academy post" 
            className="w-full max-h-96 object-cover rounded-lg"
          />
        </Card>
      ))}
    </div>
  );
};

export default Academy;