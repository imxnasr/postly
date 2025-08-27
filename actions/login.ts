"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";

interface data {
  usernameOrEmail: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
}

export const login = async (data: data): Promise<LoginResponse> => {
  try {
    if (data.usernameOrEmail.includes("@")) {
      await auth.api.signInEmail({
        body: {
          email: data.usernameOrEmail,
          password: data.password,
        },
      });
    } else {
      await auth.api.signInUsername({
        body: {
          username: data.usernameOrEmail,
          password: data.password,
        },
      });
    }
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        message: error.body?.message + "." || "",
      };
    } else {
      return {
        success: false,
        message: "Something went wrong.",
      };
    }
  }
  return { success: true, message: "Logged in successfully" };
};
