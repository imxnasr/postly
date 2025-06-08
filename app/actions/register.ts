"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { hashPassword } from "@/lib/auth";
import { ilike } from "drizzle-orm";

export const register = async (_: any, formData: FormData) => {
  // Get form data
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Check if username or email already exists
  const usernameExists = await db
    .select({ username: users.username })
    .from(users)
    .where(ilike(users.username, username));
  const emailExists = await db.select({ email: users.email }).from(users).where(ilike(users.email, email));

  // If username or email already exists, return error
  const errors = { username: "", email: "" };
  if (usernameExists.length > 0) {
    errors.username = "Username already exists";
  }
  if (emailExists.length > 0) {
    errors.email = "Email already exists";
  }
  if (errors.username || errors.email) {
    return { success: false, inputs: { username, email, password }, errors };
  }

  const hashedPassword = await hashPassword(password);

  // Create user
  await db.insert(users).values({ name: username, username, email, password: hashedPassword });
  return { success: true, message: "User created successfully" };
};
