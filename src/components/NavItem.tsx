"use client";

import { usePathname } from "next/navigation";
import DrawOutlineButton from "@/components/ui/draw-outline-button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import NotificationBadge from "./NotificationBadge";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  className?: string;
  showBadge?: boolean;
}

function NavItem({ href, icon, className, showBadge = false }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href.startsWith('/profile') && pathname.startsWith('/profile'));

  const content = (
    <DrawOutlineButton 
      className={cn(
        "rounded-full hover:bg-accent w-12 h-12 flex items-center justify-center transition-colors duration-200",
        isActive 
          ? "text-red-500 hover:text-red-600" 
          : "text-foreground hover:text-primary",
        className
      )} 
      asChild
    >
      <Link href={href}>
        {icon}
      </Link>
    </DrawOutlineButton>
  );

  if (showBadge) {
    return <NotificationBadge>{content}</NotificationBadge>;
  }

  return content;
}

export default NavItem;