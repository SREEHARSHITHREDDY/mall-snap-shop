import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserIcon, ShoppingCartIcon, ClockIcon, CreditCardIcon, PhoneIcon, MailIcon, Edit2Icon, CrownIcon } from "lucide-react";
import { useOrders } from "@/context/OrderContext";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}


export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { orders, getActiveOrders } = useOrders();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [showMembershipUpgrade, setShowMembershipUpgrade] = useState(false);
  
  // User profile state (in real app, this would come from auth context)
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    membershipTier: "Free",
    joinDate: "Member since Jan 2023"
  });

  const [editForm, setEditForm] = useState(userProfile);

  // Calculate real stats from orders
  const stats = useMemo(() => {
    const completedOrders = orders.filter(
      order => order.status === "collected" || order.status === "delivered"
    );
    const activeOrders = getActiveOrders();
    const totalSpent = completedOrders.reduce((sum, order) => sum + order.total, 0);

    return {
      totalOrders: completedOrders.length,
      totalSpent,
      activeReservations: activeOrders.length
    };
  }, [orders, getActiveOrders]);

  const handleSaveProfile = () => {
    setUserProfile(editForm);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleUpgradeMembership = (tier: string) => {
    setUserProfile(prev => ({ ...prev, membershipTier: tier }));
    setShowMembershipUpgrade(false);
    toast({
      title: "Membership Upgraded",
      description: `You are now a ${tier} member!`,
    });
  };

  const getMembershipColor = (tier: string) => {
    if (tier === "Gold") return "bg-gradient-to-r from-yellow-500 to-yellow-600";
    if (tier === "Silver") return "bg-gradient-to-r from-gray-400 to-gray-500";
    if (tier === "Platinum") return "bg-gradient-to-r from-purple-500 to-purple-600";
    return "bg-muted";
  };

  if (showMembershipUpgrade) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CrownIcon className="w-5 h-5 text-shopping-warning" />
              Upgrade Membership
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Card className="border-2 border-muted hover:border-shopping-secondary transition-colors cursor-pointer" onClick={() => handleUpgradeMembership("Silver")}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Silver Member</span>
                  <Badge variant="secondary">₹999/year</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <p>• 5% discount on all purchases</p>
                <p>• Priority customer support</p>
                <p>• Exclusive deals</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-muted hover:border-shopping-warning transition-colors cursor-pointer" onClick={() => handleUpgradeMembership("Gold")}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Gold Member</span>
                  <Badge className="bg-shopping-warning text-white">₹1,999/year</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <p>• 10% discount on all purchases</p>
                <p>• Free delivery on all orders</p>
                <p>• Priority customer support</p>
                <p>• Early access to sales</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-muted hover:border-purple-500 transition-colors cursor-pointer" onClick={() => handleUpgradeMembership("Platinum")}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Platinum Member</span>
                  <Badge className="bg-purple-600 text-white">₹3,999/year</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <p>• 15% discount on all purchases</p>
                <p>• Free express delivery</p>
                <p>• VIP customer support</p>
                <p>• Exclusive events access</p>
                <p>• Personal shopping assistant</p>
              </CardContent>
            </Card>
          </div>

          <Button variant="outline" onClick={() => setShowMembershipUpgrade(false)}>
            Back
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  if (isEditing) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit2Icon className="w-5 h-5" />
              Edit Profile
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => {
              setEditForm(userProfile);
              setIsEditing(false);
            }}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleSaveProfile}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

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
              <div className={`w-16 h-16 ${getMembershipColor(userProfile.membershipTier)} rounded-full flex items-center justify-center mx-auto mb-3`}>
                <UserIcon className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-lg">{userProfile.name}</CardTitle>
              <div className="flex items-center justify-center gap-2">
                <Badge variant={userProfile.membershipTier === "Free" ? "secondary" : "default"} className="mx-auto">
                  {userProfile.membershipTier} Member
                </Badge>
                {userProfile.membershipTier === "Free" && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 px-2 text-xs text-shopping-primary hover:text-shopping-primary"
                    onClick={() => setShowMembershipUpgrade(true)}
                  >
                    Upgrade
                  </Button>
                )}
              </div>
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
                <Badge variant="secondary">{stats.totalOrders}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCardIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Total Spent</span>
                </div>
                <span className="text-sm font-semibold text-shopping-primary">
                  ₹{stats.totalSpent.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Active Reservations</span>
                </div>
                <Badge variant="default">{stats.activeReservations}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex gap-2 pt-4">
          <Button variant="outline" className="flex-1" onClick={() => setIsEditing(true)}>
            <Edit2Icon className="w-4 h-4 mr-2" />
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