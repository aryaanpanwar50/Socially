"use client";

import { UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useFollowedUsers } from "@/hooks/useFollowedUsers";

function FollowedUsers() {
  const { followedUsers, isLoading } = useFollowedUsers(5);

  if (isLoading) {
    return (
      <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent w-12 h-12">
        <UsersIcon className="w-6 h-6 animate-pulse" />
      </Button>
    );
  }

  if (followedUsers.length === 0 && !isLoading) {
    return (
      <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent w-12 h-12 opacity-50">
        <UsersIcon className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent w-12 h-12 relative" asChild>
      <Link href="/following">
        <UsersIcon className="w-6 h-6" />
        {followedUsers.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {followedUsers.length > 9 ? "9+" : followedUsers.length}
          </span>
        )}
      </Link>
    </Button>
  );
}

export default FollowedUsers;
