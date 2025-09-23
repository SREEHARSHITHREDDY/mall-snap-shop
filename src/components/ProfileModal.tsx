import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { UserIcon, ShoppingCartIcon, ClockIcon, CreditCardIcon, MapPinIcon, PhoneIcon, MailIcon } from "lucide-react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const userProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+91 98765 43210",
  membershipTier: "Gold Member",
  joinDate: "Member since Jan 2023",
  stats: {
    totalOrders: 24,
    totalSpent: 15680,
    activeReservations: 2
  }
};

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserIcon className="w-5 h-5" />
            My Profile
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Profile Info */}
          <Card className="bg-gradient-card">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <UserIcon className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-lg">{userProfile.name}</CardTitle>
              <Badge variant="default" className="mx-auto">
                {userProfile.membershipTier}
              </Badge>
              <p className="text-xs text-muted-foreground">{userProfile.joinDate}</p>
            </CardHeader>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="flex items-center gap-3">
                <MailIcon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{userProfile.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{userProfile.phone}</span>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Shopping Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCartIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Total Orders</span>
                </div>
                <Badge variant="secondary">{userProfile.stats.totalOrders}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCardIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Total Spent</span>
                </div>
                <span className="text-sm font-semibold text-shopping-primary">
                  ₹{userProfile.stats.totalSpent.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Active Reservations</span>
                </div>
                <Badge variant="default">{userProfile.stats.activeReservations}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex gap-2 pt-4">
          <Button variant="outline" className="flex-1">
            Edit Profile
          </Button>
          <Button className="flex-1" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}