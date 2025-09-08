"use server";

import { db } from "@/db";
import { postLikes } from "@/db/schema";
import { auth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";

interface LikePostResponse {
  success: boolean;
  message: string;
}

export const likePost = async (postId: string): Promise<LikePostResponse> => {
  // Get user data
  const session = await auth.api.getSession({ headers: await headers() });
  const userInfo = session?.user;

  // Return error if user is not logged in
  if (!userInfo) {
    return {
      success: false,
      message: "You must be logged in to create a post.",
    };
  }

  try {
    // Check if the post is exist in the saved post for the user
    const likeExists = await db
      .select()
      .from(postLikes)
      .where(and(eq(postLikes.userId, userInfo.id), eq(postLikes.postId, postId)));

    if (likeExists.length > 0) {
      await db.delete(postLikes).where(and(eq(postLikes.userId, userInfo.id), eq(postLikes.postId, postId)));
    } else {
      await db.insert(postLikes).values({ postId: postId, userId: userInfo.id });
    }
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred while saving the post.",
    };
  }

  return { success: true, message: "Post liked successfully." };
};
