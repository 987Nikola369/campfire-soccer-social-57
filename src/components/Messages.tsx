import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Image, Send, Paperclip } from "lucide-react";

const Messages = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    // Handle sending message logic here
    setMessage("");
  };

  return (
    <div className="space-y-4 py-4 animate-fade-in">
      <div className="flex gap-4">
        <div className="w-1/3">
          <Input
            placeholder="Search messages..."
            className="bg-[#1a1d21]/90 backdrop-blur-lg border-none mb-4"
          />
          <div className="space-y-2">
            <Card className="p-4 bg-[#1a1d21]/90 backdrop-blur-lg border-none hover:bg-white/5 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-[#2a2d31] text-white">CM</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-white">Coach Mike</h3>
                  <p className="text-sm text-gray-400">See you at practice tomorrow!</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        <Card className="flex-1 p-4 bg-[#1a1d21]/90 backdrop-blur-lg border-none min-h-[600px] flex flex-col">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <Avatar>
              <AvatarFallback className="bg-[#2a2d31] text-white">CM</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-white">Coach Mike</h3>
              <p className="text-sm text-gray-400">Active now</p>
            </div>
          </div>
          
          <div className="flex-1 py-4 space-y-4">
            {/* Messages will be displayed here */}
          </div>
          
          <div className="flex gap-2 items-center">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-gray-400 hover:text-white hover:bg-[#2a2d31]"
            >
              <Image className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-gray-400 hover:text-white hover:bg-[#2a2d31]"
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-[#2a2d31] border-none"
            />
            <Button 
              onClick={handleSendMessage}
              className="bg-[#E41E12] hover:bg-[#E41E12]/90"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Messages;