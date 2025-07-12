"use server";

import { db } from "@/db";
import { post } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface CreatePostResponse {
  success: boolean;
  message?: string;
  errors: {
    title?: string;
    body?: string;
  };
  inputs?: {
    title?: string;
    body?: string;
  };
}

export const createPost = async (_: any, formData: FormData): Promise<any> => {
  const data = {
    title: formData.get("title") as string,
    body: formData.get("body") as string,
  };

  let result: CreatePostResponse = {
    success: true,
    errors: {},
    inputs: data,
  };

  // Get user data
  const session = await auth.api.getSession({ headers: await headers() });
  const userInfo = session?.user;

  // Return error if user is not logged in
  if (!userInfo) {
    return {
      success: false,
      message: "You must be logged in to create a post.",
      errors: {},
      inputs: data,
    };
  }

  // Validate Title
  if (!data.title || data.title.length < 1) {
    result.success = false;
    result.errors.title = "Title must be at least 1 character long.";
  }

  // Validate Body
  if (!data.body || data.body.length < 1) {
    result.success = false;
    result.errors.body = "Body must be at least 1 character long.";
  }

  if (!result.success) {
    return result;
  }

  try {
    await db.insert(post).values({ title: data.title, content: data.body, authorId: userInfo.id });
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong.",
      errors: {},
      inputs: data,
    };
  }

  return { success: true, message: "Post created successfully", errors: {} };
};
