"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";

interface data {
  name: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  success: boolean;
  message: string;
}

export const register = async (data: data): Promise<RegisterResponse> => {
  try {
    await auth.api.signUpEmail({ body: data });
  } catch (error) {
    if (error instanceof APIError) {
      console.warn("Error signing up:", error.body?.code, error.body?.message);
      if (error.body?.code === "USER_ALREADY_EXISTS") {
        return {
          success: false,
          message: "User already exists.",
        };
      }
    } else {
      return {
        success: false,
        message: "Something went wrong.",
      };
    }
  }
  return { success: true, message: "User created successfully" };
};
