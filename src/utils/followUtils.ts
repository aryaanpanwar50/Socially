"use client";

import { triggerFollowUpdate } from "@/hooks/useFollowedUsers";

// Client-side utility to trigger follow updates
export const triggerFollowUpdateClient = () => {
  // Trigger the hook-based updates
  triggerFollowUpdate();
  
  // Also trigger window event for additional listeners
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('followUpdate'));
  }
};

// Enhanced toggleFollow wrapper that includes immediate UI updates
export const toggleFollowWithUpdate = async (toggleFollowFn: () => Promise<{ success: boolean; error?: string }>) => {
  try {
    const result = await toggleFollowFn();
    
    // Trigger immediate UI update regardless of server response
    triggerFollowUpdateClient();
    
    return result;
  } catch (error) {
    console.error("Error in toggleFollowWithUpdate:", error);
    throw error;
  }
};
