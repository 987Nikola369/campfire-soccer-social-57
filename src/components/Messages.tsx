import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Messages = () => {
  return (
    <div className="space-y-4 py-4 animate-fade-in">
      <Input
        placeholder="Search messages..."
        className="bg-black/30 backdrop-blur-lg border-none"
      />
      <Card className="p-4 bg-black/30 backdrop-blur-lg border-none hover:bg-white/5 transition-colors cursor-pointer">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#E41E12]"></div>
          <div>
            <h3 className="font-semibold">Coach Mike</h3>
            <p className="text-sm text-gray-400">See you at practice tomorrow!</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Messages;