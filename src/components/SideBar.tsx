import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { LinkIcon, MapPinIcon } from "lucide-react";
import { getUserByClerkId } from "@/actions/user.action";

const SideBar = async() => {
    const authUser = await currentUser()
    if(!authUser){
        return <UnAuthenticatedSidebar/>
    }

    const user = await getUserByClerkId(authUser.id);
    if(!user){
        return null
    }
    // console.log({user})
  return (
    <div className="sticky top-20">
        <Card className="overflow-hidden border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card via-card to-card/95">
        <CardContent className="pt-8 pb-6 px-6">
          <div className="flex flex-col items-center text-center">
            <Link
              href={`/profile/${user.username}`}
              className="flex flex-col items-center justify-center group"
            >
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-primary/20 shadow-lg group-hover:border-primary/40 transition-all duration-300 group-hover:scale-105">
                  <AvatarImage src={user.image || "/avatar.png"} className="object-cover" />
                </Avatar>
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-transparent to-primary/10 group-hover:to-primary/20 transition-all duration-300" />
              </div>

              <div className="mt-5 space-y-2">
                <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-200">{user.name}</h3>
                <p className="text-sm text-muted-foreground/80 group-hover:text-primary/70 transition-colors duration-200">@{user.username}</p>
              </div>
            </Link>

            {user.bio && (
              <div className="mt-4 p-3 bg-muted/30 rounded-lg border border-border/30">
                <p className="text-sm text-muted-foreground/90 leading-relaxed">{user.bio}</p>
              </div>
            )}

            <div className="w-full mt-6">
              <Separator className="my-5 bg-gradient-to-r from-transparent via-border to-transparent" />
              <div className="flex justify-around">
                <div className="text-center group cursor-pointer">
                  <p className="font-bold text-xl text-foreground group-hover:text-primary transition-colors duration-200">{user._count.following}</p>
                  <p className="text-xs text-muted-foreground/70 font-medium uppercase tracking-wider">Following</p>
                </div>
                <Separator orientation="vertical" className="h-12 self-center bg-border/50" />
                <div className="text-center group cursor-pointer">
                  <p className="font-bold text-xl text-foreground group-hover:text-primary transition-colors duration-200">{user._count.followers}</p>
                  <p className="text-xs text-muted-foreground/70 font-medium uppercase tracking-wider">Followers</p>
                </div>
              </div>
              <Separator className="my-5 bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>

            <div className="w-full space-y-3 text-sm">
              <div className="flex items-center text-muted-foreground/80 p-2 rounded-lg bg-muted/20 border border-border/20">
                <MapPinIcon className="w-4 h-4 mr-3 text-primary/70 flex-shrink-0" />
                <span className="truncate">{user.location || "Location not specified"}</span>
              </div>
              <div className="flex items-center text-muted-foreground/80 p-2 rounded-lg bg-muted/20 border border-border/20">
                <LinkIcon className="w-4 h-4 mr-3 text-primary/70 flex-shrink-0" />
                {user.website ? (
                  <a 
                    href={`${user.website}`} 
                    className="hover:text-primary hover:underline truncate transition-colors duration-200" 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {user.website}
                  </a>
                ) : (
                  <span className="truncate">No website</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SideBar

const UnAuthenticatedSidebar = () => (
  <div className="sticky top-20">
    <Card className="overflow-hidden border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card via-card to-card/95">
      <CardHeader className="pb-4">
        <CardTitle className="text-center text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Welcome Back!
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-4 bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg border border-border/30">
          <p className="text-muted-foreground/90 leading-relaxed">
            Join our community to connect with others, share your thoughts, and discover amazing content.
          </p>
        </div>
        
        <div className="space-y-3">
          <SignInButton mode="modal">
            <Button className="w-full py-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-sm hover:shadow-md transition-all duration-200 font-medium" variant="default">
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button className="w-full py-3 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-200 font-medium" variant="outline">
              Create Account
            </Button>
          </SignUpButton>
        </div>
        
        <div className="pt-2 border-t border-border/30">
          <p className="text-xs text-center text-muted-foreground/70">
            By signing up, you agree to our terms of service
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
);