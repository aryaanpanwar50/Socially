import { getPosts } from "@/actions/post.action";
import { getDbUserId } from "@/actions/user.action";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import WhoToFollow from "@/components/WhoToFollow";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  
  const user = await currentUser()
  const posts = await getPosts();
  const dbUserId = await getDbUserId();
  // console.log(posts)
  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {user ? <CreatePost/>:null}
            <div className="space-y-6">
              {posts.map((post)=>(
                <PostCard key={post.id} post={post} dbUserId={dbUserId}/>
              ))}
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-1 sticky top-20 space-y-6">
             <WhoToFollow/>
             {/* Optional: Add a cosmic accent card */}
             <div className="card-blend-cosmic rounded-lg p-4 border border-border/10">
               <div className="text-center text-sm text-muted-foreground/70">
                 ✨ Discover amazing content
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
