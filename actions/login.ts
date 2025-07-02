"use server";

import { db } from "@/db";
import { user } from "@/db/schema";
import { ilike } from "drizzle-orm";

export const login = async (_: any, formData: FormData) => {
  console.log("Login action called");
  // Get form data
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, message: "Email and password are required" };
  }

  // Check if user exists
  const userData = await db.select().from(user).where(ilike(user.email, email));

  // If user doesn't exist, return error
  // if (user.length === 0) {
  //   return { success: false, errors: { email: "User not found" }, inputs: { email, password } };
  // }

  // Check if password is correct
  // const passwordCorrect = await checkPassword(password, user[0].password);
  // if (!passwordCorrect) {
  //   return { success: false, errors: { password: "Incorrect password" }, inputs: { email, password } };
  // }

  // Better Auth Login
  // const { data, error } = await authClient.signIn.email({
  //   email,
  //   password,
  //   callbackURL: "/",
  //   rememberMe: true,
  // });
  // console.log(data, error);
  // return;
  return { success: true, message: "Logged in successfully" };
};
