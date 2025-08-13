"use client";

import { UsersIcon } from "lucide-react";
import DrawOutlineButton from "@/components/ui/draw-outline-button";
import Link from "next/link";
import { useFollowedUsers } from "@/hooks/useFollowedUsers";

function FollowedUsers() {
  const { followedUsers, isLoading } = useFollowedUsers(5);

  if (isLoading) {
    return (
      <DrawOutlineButton className="rounded-full hover:bg-accent w-12 h-12 flex items-center justify-center text-foreground hover:text-primary">
        <UsersIcon className="w-6 h-6 animate-pulse" />
      </DrawOutlineButton>
    );
  }

  if (followedUsers.length === 0 && !isLoading) {
    return (
      <DrawOutlineButton className="rounded-full hover:bg-accent w-12 h-12 flex items-center justify-center text-foreground hover:text-primary opacity-50">
        <UsersIcon className="w-6 h-6" />
      </DrawOutlineButton>
    );
  }

  return (
    <DrawOutlineButton className="rounded-full hover:bg-accent w-12 h-12 flex items-center justify-center text-foreground hover:text-primary relative" asChild>
      <Link href="/following">
        <UsersIcon className="w-6 h-6" />
        {followedUsers.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {followedUsers.length > 9 ? "9+" : followedUsers.length}
          </span>
        )}
      </Link>
    </DrawOutlineButton>
  );
}

export default FollowedUsers;
