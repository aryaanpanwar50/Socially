"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { toggleFollow } from "@/actions/user.action";
import { triggerFollowUpdateClient } from "@/utils/followUtils";

function FollowButton({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async () => {
    setIsLoading(true);

    try {
      const result = await toggleFollow(userId);
      
      // Trigger immediate UI update
      triggerFollowUpdateClient();
      
      if (result?.success) {
        toast.success("User followed successfully");
      } else {
        toast.error("Error following user");
      }
    } catch {
      toast.error("Error following user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size={"sm"}
      variant={"secondary"}
      onClick={handleFollow}
      disabled={isLoading}
      className="w-20"
    >
      {isLoading ? <Loader2Icon className="size-4 animate-spin" /> : "Follow"}
    </Button>
  );
}
export default FollowButton;