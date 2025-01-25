import { Card } from "@/components/ui/card";

const Notifications = () => {
  return (
    <div className="space-y-4 py-4 animate-fade-in">
      <Card className="p-4 bg-black/30 backdrop-blur-lg border-none">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#E41E12]"></div>
          <div>
            <h3 className="font-semibold">Team Update</h3>
            <p className="text-sm text-gray-400">New practice schedule posted</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Notifications;