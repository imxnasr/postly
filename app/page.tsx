import { Post } from "@/components/Post";
import { db } from "@/db";
import { post } from "@/db/schema";
import { desc } from "drizzle-orm";

export default async () => {
  const posts = await db.query.post.findMany({
    orderBy: [desc(post.createdAt)],
    with: {
      user: true,
    },
  });
  return (
    <div className="space-y-4">
      {posts.map((post, idx) => (
        <Post data={post} key={idx} />
      ))}
    </div>
  );
};
