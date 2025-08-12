"use client";

import { useState, useEffect, useCallback } from "react";
import { getFollowedUsers } from "@/actions/profile.action";

type FollowedUser = Awaited<ReturnType<typeof getFollowedUsers>>[number];

// Create a global event system for follow/unfollow updates
const followUpdateListeners: Set<() => void> = new Set();

export const useFollowedUsers = (limit: number = 5) => {
  const [followedUsers, setFollowedUsers] = useState<FollowedUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFollowedUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const users = await getFollowedUsers(limit);
      setFollowedUsers(users);
    } catch (error) {
      console.error("Failed to fetch followed users:", error);
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  const refreshFollowedUsers = useCallback(async () => {
    await fetchFollowedUsers();
  }, [fetchFollowedUsers]);

  // Initial load
  useEffect(() => {
    refreshFollowedUsers();
  }, [refreshFollowedUsers]);

  // Listen for follow/unfollow events
  useEffect(() => {
    followUpdateListeners.add(refreshFollowedUsers);
    
    // Also listen for custom window events
    const handleFollowUpdate = () => {
      refreshFollowedUsers();
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('followUpdate', handleFollowUpdate);
    }
    
    return () => {
      followUpdateListeners.delete(refreshFollowedUsers);
      if (typeof window !== 'undefined') {
        window.removeEventListener('followUpdate', handleFollowUpdate);
      }
    };
  }, [refreshFollowedUsers]);

  return {
    followedUsers,
    isLoading,
    refreshFollowedUsers,
  };
};

// Function to trigger updates across all components
export const triggerFollowUpdate = () => {
  followUpdateListeners.forEach(listener => listener());
};
