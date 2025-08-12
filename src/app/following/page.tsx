import { getFollowedUsers } from "@/actions/profile.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import FollowingPageClient from "../../components/FollowingPageClient";

export const metadata = {
  title: "Following - Social Media",
  description: "See all the users you're following",
};

async function FollowingPage() {

    await new Promise(resolve => setTimeout(resolve, 2000));
  const user = await currentUser();

  
  
  if (!user) {
    redirect("/");
  }

  // Get all followed users (no limit)
  const followedUsers = await getFollowedUsers(100);

  return <FollowingPageClient followedUsers={followedUsers} />;
}

export default FollowingPage;