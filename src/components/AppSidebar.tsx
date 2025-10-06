import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  ShirtIcon, 
  UtensilsIcon, 
  ShoppingBagIcon, 
  ShoppingCartIcon,
  QrCodeIcon,
  ClockIcon,
  HomeIcon,
  DatabaseIcon
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const mainCategories = [
  { title: "Home", url: "/", icon: HomeIcon },
  { title: "Clothing", url: "/clothing", icon: ShirtIcon },
  { title: "Food Court", url: "/food", icon: UtensilsIcon },
  { title: "Other Stores", url: "/other", icon: ShoppingBagIcon },
];

const quickActions = [
  { title: "My Cart", url: "/cart", icon: ShoppingCartIcon },
  { title: "My Orders", url: "/orders", icon: ClockIcon },
  { title: "QR Codes", url: "/qr-codes", icon: QrCodeIcon },
];

const devTools = [
  { title: "MongoDB Demo", url: "/mongodb-demo", icon: DatabaseIcon },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-gradient-primary text-primary-foreground font-medium shadow-glow" 
      : "text-foreground hover:bg-shopping-surface-variant transition-smooth";

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-gradient-surface">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <ShoppingBagIcon className="w-5 h-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
                  Shopping Matrix
                </h2>
                <p className="text-xs text-muted-foreground">Mall Platform</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup className="px-4 py-4">
          <SidebarGroupLabel className="text-muted-foreground font-medium mb-2">
            {!collapsed && "Categories"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainCategories.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={`${getNavCls({ isActive: isActive(item.url) })} rounded-lg px-3 py-2 flex items-center gap-3`}
                    >
                      <item.icon className="w-5 h-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="px-4 py-4">
          <SidebarGroupLabel className="text-muted-foreground font-medium mb-2">
            {!collapsed && "Quick Actions"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {quickActions.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`${getNavCls({ isActive: isActive(item.url) })} rounded-lg px-3 py-2 flex items-center gap-3`}
                    >
                      <item.icon className="w-5 h-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="px-4 py-4">
          <SidebarGroupLabel className="text-muted-foreground font-medium mb-2">
            {!collapsed && "Developer Tools"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {devTools.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`${getNavCls({ isActive: isActive(item.url) })} rounded-lg px-3 py-2 flex items-center gap-3`}
                    >
                      <item.icon className="w-5 h-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}