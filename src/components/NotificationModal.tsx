import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BellIcon, ShoppingCartIcon, ClockIcon, CheckCircleIcon } from "lucide-react";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const sampleNotifications = [
  {
    id: "1",
    type: "order",
    title: "Order Ready for Pickup",
    message: "Your Zara order #ZR001 is ready for pickup at store counter",
    time: "2 minutes ago",
    isRead: false
  },
  {
    id: "2", 
    type: "promotion",
    title: "Special Offer",
    message: "Get 20% off on all H&M items this weekend only!",
    time: "1 hour ago",
    isRead: false
  },
  {
    id: "3",
    type: "reservation",
    title: "Trial Reminder",
    message: "Your trial reservation at Adidas expires in 30 minutes",
    time: "2 hours ago",
    isRead: true
  }
];

export function NotificationModal({ isOpen, onClose }: NotificationModalProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "order":
        return <ShoppingCartIcon className="w-5 h-5 text-shopping-primary" />;
      case "promotion":
        return <BellIcon className="w-5 h-5 text-green-500" />;
      case "reservation":
        return <ClockIcon className="w-5 h-5 text-orange-500" />;
      default:
        return <BellIcon className="w-5 h-5" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BellIcon className="w-5 h-5" />
            Notifications
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {sampleNotifications.map((notification, index) => (
            <div key={notification.id}>
              <div className={`flex gap-3 p-3 rounded-lg ${
                !notification.isRead ? 'bg-shopping-surface' : 'bg-transparent'
              }`}>
                <div className="flex-shrink-0 mt-1">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-semibold text-sm">{notification.title}</h4>
                    {!notification.isRead && (
                      <Badge variant="default" className="text-xs">New</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {notification.time}
                  </p>
                </div>
              </div>
              {index < sampleNotifications.length - 1 && <Separator className="my-2" />}
            </div>
          ))}
        </div>
        
        <div className="flex gap-2 pt-4">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Mark All as Read
          </Button>
          <Button className="flex-1" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}