import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAllAsRead: () => void;
  markAsRead: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const initialNotifications: Notification[] = [
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

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAllAsRead,
      markAsRead
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}