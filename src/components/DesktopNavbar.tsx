import { BellIcon, HomeIcon, UserIcon } from "lucide-react";
import DrawOutlineButton from "@/components/ui/draw-outline-button";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";
import ModeToggle from "./ModeToggle";
import FollowedUsers from "./FollowedUsers";
import { currentUser } from "@clerk/nextjs/server";

async function DesktopNavbar() {
  const user = await currentUser();

  return (
    <div className="flex items-center justify-center space-x-4">
      
   
      <DrawOutlineButton className="rounded-full hover:bg-accent w-12 h-12 flex items-center justify-center text-foreground hover:text-primary" asChild>
        <Link href="/">
          <HomeIcon className="w-6 h-6" />
        </Link>
      </DrawOutlineButton>

      {user ? (
        <>
          <DrawOutlineButton className="rounded-full hover:bg-accent w-12 h-12 flex items-center justify-center text-foreground hover:text-primary" asChild>
            <Link href="/notifications">
              <BellIcon className="w-6 h-6" />
            </Link>
          </DrawOutlineButton>
          <FollowedUsers />
          <DrawOutlineButton className="rounded-full hover:bg-accent w-12 h-12 flex items-center justify-center text-foreground hover:text-primary" asChild>
            <Link
              href={`/profile/${
                user.username ?? user.emailAddresses[0].emailAddress.split("@")[0]
              }`}
            >
              <UserIcon className="w-6 h-6" />
            </Link>
          </DrawOutlineButton>
          
          {/* Separator */}
          <div className="w-px h-6 bg-border mx-2"></div>
          
          <div className="w-10 h-10 flex items-center justify-center">
            <UserButton />
          </div>
          <ModeToggle />
        </>
      ) : (
        <>
          <ModeToggle />
          <SignInButton mode="modal">
            <DrawOutlineButton className="rounded-full px-4 py-2 text-sm font-medium">
              Sign In
            </DrawOutlineButton>
          </SignInButton>
        </>
      )}
    </div>
  );
}
export default DesktopNavbar;