import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Heart, MessageSquare, Reply } from "lucide-react";
import { Notification } from "@/types/post";

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
      case 'comment_like':
        return <Heart className="w-5 h-5 text-[#E41E12]" />;
      case 'comment':
        return <MessageSquare className="w-5 h-5 text-blue-500" />;
      case 'reply':
        return <Reply className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  const getNotificationText = (notification: Notification) => {
    switch (notification.type) {
      case 'like':
        return `liked your post`;
      case 'comment':
        return `commented on your post`;
      case 'reply':
        return `replied to your comment`;
      case 'comment_like':
        return `liked your comment`;
      default:
        return '';
    }
  };

  return (
    <div className="space-y-4 py-4 animate-fade-in">
      {notifications.length === 0 ? (
        <Card className="p-4 bg-[#1a1d21]/90 backdrop-blur-lg border-none animate-fade-in">
          <p className="text-center text-gray-400">No notifications yet</p>
        </Card>
      ) : (
        notifications.map((notification) => (
          <Card 
            key={notification.id} 
            className="p-4 bg-[#1a1d21]/90 backdrop-blur-lg border-none hover:bg-[#2a2d31] transition-colors animate-fade-in"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2a2d31] flex items-center justify-center">
                {getNotificationIcon(notification.type)}
              </div>
              <div>
                <p className="font-semibold text-white">
                  {notification.actorName} {getNotificationText(notification)}
                </p>
                <p className="text-sm text-gray-400">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default Notifications;
