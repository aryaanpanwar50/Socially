"use client";

import { useEffect, useState } from "react";

interface NotificationBadgeProps {
  children: React.ReactNode;
}

function NotificationBadge({ children }: NotificationBadgeProps) {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        // Using fetch API to get notifications from your API route
        const response = await fetch('/api/notifications');
        if (response.ok) {
          const notifications = await response.json();
          const unreadNotifications = notifications.filter((n: any) => !n.read);
          setUnreadCount(unreadNotifications.length);
        }
      } catch (error) {
        console.error("Failed to fetch notification count:", error);
      }
    };

    fetchUnreadCount();

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);

    // Listen for custom events when notifications are read
    const handleNotificationRead = () => {
      fetchUnreadCount();
    };

    window.addEventListener('notificationRead', handleNotificationRead);

    return () => {
      clearInterval(interval);
      window.removeEventListener('notificationRead', handleNotificationRead);
    };
  }, []);

  return (
    <div className="relative">
      {children}
      {unreadCount > 0 && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg animate-pulse">
          {unreadCount > 99 ? '99+' : unreadCount}
        </div>
      )}
    </div>
  );
}

export default NotificationBadge;