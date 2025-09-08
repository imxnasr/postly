import { Post } from "@/components/Post";
import { db } from "@/db";
import { post } from "@/db/schema";
import { auth } from "@/lib/auth";
import { desc } from "drizzle-orm";
import { headers } from "next/headers";

export default async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const posts = await db.query.post.findMany({
    orderBy: [desc(post.createdAt)],
    with: {
      user: true,
      savedPost: true,
      postLikes: true,
    },
  });
  return (
    <div className="space-y-4">
      {posts.map((post, idx) => (
        <Post
          data={{
            ...post,
            isSaved: post.savedPost.some((p) => p.userId === session?.user?.id),
            isLiked: post.postLikes.some((p) => p.userId === session?.user?.id),
          }}
          key={idx}
        />
      ))}
    </div>
  );
};
