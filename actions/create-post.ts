"use server";

import { db } from "@/db";
import { post } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface Data {
  title: string;
  body: string;
}

interface CreatePostResponse {
  success: boolean;
  message: string;
}

export const createPost = async (data: Data): Promise<CreatePostResponse> => {
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
    await db.insert(post).values({ title: data.title, content: data.body, authorId: userInfo.id });
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong.",
    };
  }

  return { success: true, message: "Post created successfully" };
};
