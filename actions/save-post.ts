"use server";

import { db } from "@/db";
import { savedPost } from "@/db/schema";
import { auth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";

interface SavePostResponse {
  success: boolean;
  message: string;
}

export const savePost = async (postId: string): Promise<SavePostResponse> => {
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
    const savedPostExists = await db
      .select()
      .from(savedPost)
      .where(and(eq(savedPost.userId, userInfo.id), eq(savedPost.postId, postId)));

    if (savedPostExists.length > 0) {
      await db.delete(savedPost).where(and(eq(savedPost.userId, userInfo.id), eq(savedPost.postId, postId)));
      return { success: true, message: "Post unsaved successfully." };
    } else {
      await db.insert(savedPost).values({ postId: postId, userId: userInfo.id });
      return { success: true, message: "Post saved successfully." };
    }
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred while saving the post.",
    };
  }
};
