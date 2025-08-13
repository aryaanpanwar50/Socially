"use client";

import { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeftIcon, SearchIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { getFollowedUsers } from "@/actions/profile.action";
import { useFollowedUsers } from "@/hooks/useFollowedUsers";

type FollowedUser = Awaited<ReturnType<typeof getFollowedUsers>>[number];

interface FollowingPageClientProps {
  followedUsers: FollowedUser[];
}

function FollowingPageClient({ followedUsers: initialFollowedUsers }: FollowingPageClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Use the real-time hook for updates, but initialize with server data
  const { followedUsers: liveFollowedUsers } = useFollowedUsers(100);
  
  // Use live data if available, otherwise fall back to initial data
  const followedUsers = liveFollowedUsers.length > 0 ? liveFollowedUsers : initialFollowedUsers;

  // Filter users based on search term
  const filteredUsers = followedUsers.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.bio?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="card-blend-light border border-border/20 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="card-blend-overlay">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/">
                  <ArrowLeftIcon className="w-5 h-5" />
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <UsersIcon className="w-6 h-6 text-primary" />
                <CardTitle className="text-2xl">Following</CardTitle>
              </div>
            </div>
            <div className="text-muted-foreground">
              {followedUsers.length} {followedUsers.length === 1 ? 'user' : 'users'}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Search */}
      {followedUsers.length > 0 && (
        <Card className="card-blend-light border border-border/20">
          <CardContent className="pt-6 card-blend-overlay">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search followed users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-border/20"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Users List */}
      <Card className="card-blend-light border border-border/20">
        <CardContent className="p-0">
          {filteredUsers.length === 0 ? (
            <div className="p-8 text-center card-blend-overlay rounded-lg m-4 border border-border/15">
              {followedUsers.length === 0 ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <UsersIcon className="w-8 h-8 text-primary/50" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">No following yet</h3>
                    <p className="text-muted-foreground">
                      Start following users to see them here
                    </p>
                  </div>
                  <Button asChild>
                    <Link href="/">Discover Users</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <SearchIcon className="w-8 h-8 text-primary/50" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">No results found</h3>
                    <p className="text-muted-foreground">
                      Try searching with different keywords
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => setSearchTerm("")}>
                    Clear Search
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="divide-y divide-border/15">
              {filteredUsers.map((user, index) => (
                <div key={user.id} className="p-6 hover:card-blend-cosmic-soft transition-all duration-300 card-blend-overlay">
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/profile/${user.username}`}
                      className="flex items-center space-x-4 flex-1 min-w-0"
                    >
                      <Avatar className="w-12 h-12 border-2 border-border/30">
                        <AvatarImage src={user.image || "/avatar.png"} />
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold truncate">
                            {user.name || user.username}
                          </h3>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground text-sm">
                            #{index + 1}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm truncate">
                          @{user.username}
                        </p>
                        {user.bio && (
                          <p className="text-sm text-muted-foreground mt-1 truncate">
                            {user.bio}
                          </p>
                        )}
                      </div>
                    </Link>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/profile/${user.username}`}>
                        View Profile
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats Footer */}
      {followedUsers.length > 0 && (
        <Card className="card-blend-light border border-border/20">
          <CardContent className="pt-6 card-blend-overlay">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                Showing {filteredUsers.length} of {followedUsers.length} followed users
              </span>
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchTerm("")}
                >
                  Clear Search
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default FollowingPageClient;
