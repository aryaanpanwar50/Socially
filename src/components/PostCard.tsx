"use client"

import { createComment, deletePost, getPosts, toggleLike } from "@/actions/post.action";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useState } from "react";
import toast from "react-hot-toast";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarImage } from "./ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { DeleteAlertDialog } from "./DeleteAlertDialog";
import { Button } from "./ui/button";
import { HeartIcon, LogInIcon, MessageCircleIcon, SendIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";


type Posts = Awaited<ReturnType<typeof getPosts>>
type Post = Posts[number]

const PostCard = ({post,dbUserId}:{post:Post , dbUserId:string | null}) => {
    const {user} = useUser()
    const [newComment,setNewComment] = useState("")
    const [isCommenting,setIsCommenting] = useState(false)
    const [isLiking,setIsLiking] = useState(false)
    const [isDeleting,setIsDeleting] = useState(false)
    const [hasLiked,setHasLiked] = useState(post.likes.some(like=>like.userId===dbUserId))
    const[optimisticLikes,setOptimisticLikes] = useState(post._count.likes)
    const [showComments, setShowComments] = useState(false);

    const handleLike=async()=>{
        if(isLiking) return

        try{
            setIsLiking(true)
            setHasLiked(prev=>!prev)
            setOptimisticLikes(prev=>prev+(hasLiked ?-1:1))
            await toggleLike(post.id)
        }catch(error){
            console.error("Failed to toggle like:", error);
            setOptimisticLikes(post._count.likes)
            setHasLiked(post.likes.some(like=>like.userId===dbUserId))
        }finally{
            setIsLiking(false)
        }
    }

    const handleAddComment = async () => {
    if (!newComment.trim() || isCommenting) return;
    try {
      setIsCommenting(true);
      const result = await createComment(post.id, newComment);
      if (result?.success) {
        toast.success("Comment posted successfully");
        setNewComment("");
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
      toast.error("Failed to add comment");
    } finally {
      setIsCommenting(false);
    }
  };

  const handleDeletePost = async () => {
    if (isDeleting) return;
    try {
      setIsDeleting(true);
      const result = await deletePost(post.id);
      if (result.success) toast.success("Post deleted successfully");
      else throw new Error(result.error);
    } catch (error) {
      console.error("Failed to delete post:", error);
      toast.error("Failed to delete post");
    } finally {
      setIsDeleting(false);
    }
  };


    
  return (
    <Card className="overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-card via-card to-card/95">
      <CardContent className="p-5 sm:p-7">
        <div className="space-y-5">
          <div className="flex space-x-4">
            <Link href={`/profile/${post.author.username}`} className="group">
              <Avatar className="size-11 sm:w-12 sm:h-12 ring-2 ring-transparent group-hover:ring-primary/20 transition-all duration-200">
                <AvatarImage src={post.author.image ?? "/avatar.png"} className="object-cover" />
              </Avatar>
            </Link>

            {/* POST HEADER & TEXT CONTENT */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 truncate">
                  <Link
                    href={`/profile/${post.author.username}`}
                    className="font-bold text-foreground hover:text-primary transition-colors duration-200 truncate"
                  >
                    {post.author.name}
                  </Link>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground/80">
                    <Link 
                      href={`/profile/${post.author.username}`}
                      className="hover:text-primary transition-colors duration-200"
                    >
                      @{post.author.username}
                    </Link>
                    <span className="text-muted-foreground/50">•</span>
                    <span className="text-muted-foreground/70">{formatDistanceToNow(new Date(post.createdAt))} ago</span>
                  </div>
                </div>
                {/* Check if current user is the post author */}
                {dbUserId === post.author.id && (
                  <DeleteAlertDialog isDeleting={isDeleting} onDelete={handleDeletePost} />
                )}
              </div>
              <p className="mt-3 text-foreground/90 leading-relaxed break-words">{post.content}</p>
            </div>
          </div>

          {/* POST IMAGE */}
          {post.image && (
            <div className="rounded-xl overflow-hidden border border-border/30 shadow-sm">
              <Image 
                src={post.image} 
                alt="Post content" 
                width={600} 
                height={400} 
                className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-300" 
                unoptimized
              />
            </div>
          )}

          {/* LIKE & COMMENT BUTTONS */}
          <div className="flex items-center pt-3 space-x-6 border-t border-border/30">
            {user ? (
              <Button
                variant="ghost"
                size="sm"
                className={`group relative gap-2 px-3 py-2 rounded-full transition-all duration-200 ${
                  hasLiked 
                    ? "text-red-500 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-950/50" 
                    : "text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                }`}
                onClick={handleLike}
                disabled={isLiking}
              >
                {hasLiked ? (
                  <HeartIcon className="size-5 fill-current animate-pulse" />
                ) : (
                  <HeartIcon className="size-5 group-hover:scale-110 transition-transform duration-200" />
                )}
                <span className="font-medium">{optimisticLikes}</span>
              </Button>
            ) : (
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm" className="group gap-2 px-3 py-2 rounded-full text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-200">
                  <HeartIcon className="size-5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">{optimisticLikes}</span>
                </Button>
              </SignInButton>
            )}

            <Button
              variant="ghost"
              size="sm"
              className={`group gap-2 px-3 py-2 rounded-full transition-all duration-200 ${
                showComments 
                  ? "text-blue-500 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-950/50" 
                  : "text-muted-foreground hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20"
              }`}
              onClick={() => setShowComments((prev) => !prev)}
            >
              <MessageCircleIcon
                className={`size-5 group-hover:scale-110 transition-transform duration-200 ${showComments ? "fill-current" : ""}`}
              />
              <span className="font-medium">{post.comments.length}</span>
            </Button>
          </div>

          {/* COMMENTS SECTION */}
          {showComments && (
            <div className="space-y-5 pt-5 border-t border-border/30 bg-gradient-to-br from-muted/20 to-transparent rounded-lg p-4 -mx-1">
              <div className="space-y-4">
                {/* DISPLAY COMMENTS */}
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3 p-3 rounded-lg bg-card/50 border border-border/30 hover:bg-card/80 transition-colors duration-200">
                    <Avatar className="size-8 flex-shrink-0 ring-1 ring-border/20">
                      <AvatarImage src={comment.author.image ?? "/avatar.png"} className="object-cover" />
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="font-semibold text-sm text-foreground">{comment.author.name}</span>
                        <span className="text-sm text-muted-foreground/70">
                          @{comment.author.username}
                        </span>
                        <span className="text-sm text-muted-foreground/50">·</span>
                        <span className="text-sm text-muted-foreground/70">
                          {formatDistanceToNow(new Date(comment.createdAt))} ago
                        </span>
                      </div>
                      <p className="text-sm text-foreground/90 mt-1 leading-relaxed break-words">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {user ? (
                <div className="flex space-x-3 p-4 bg-card/30 rounded-lg border border-border/30">
                  <Avatar className="size-9 flex-shrink-0 ring-2 ring-primary/20">
                    <AvatarImage src={user?.imageUrl || "/avatar.png"} className="object-cover" />
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Write a thoughtful comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[90px] resize-none border-border/50 focus:border-primary/50 focus:ring-primary/20 bg-background/50 backdrop-blur-sm"
                    />
                    <div className="flex justify-end mt-3">
                      <Button
                        size="sm"
                        onClick={handleAddComment}
                        className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-sm hover:shadow-md transition-all duration-200"
                        disabled={!newComment.trim() || isCommenting}
                      >
                        {isCommenting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Posting...
                          </>
                        ) : (
                          <>
                            <SendIcon className="size-4" />
                            Comment
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center p-6 border-2 border-dashed border-border/30 rounded-xl bg-gradient-to-br from-muted/30 to-muted/10">
                  <SignInButton mode="modal">
                    <Button variant="outline" className="gap-2 px-6 py-3 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-200">
                      <LogInIcon className="size-4" />
                      Sign in to join the conversation
                    </Button>
                  </SignInButton>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default PostCard