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
    const username = data.email.split("@")[0] + "_" + Math.random().toString(36).slice(2, 8);
    const body = {
      ...data,
      username,
    };
    await auth.api.signUpEmail({ body });
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
