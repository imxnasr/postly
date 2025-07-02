"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { NextResponse } from "next/server";

interface RegisterResponse {
  success: boolean;
  message?: string;
  errors: {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
  };
  inputs?: {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
  };
}

export const register = async (_: any, formData: FormData): Promise<RegisterResponse> => {
  const body = {
    name: formData.get("name") as string,
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  let result: RegisterResponse = {
    success: true,
    errors: {},
    inputs: body,
  };

  // Validate Name
  if (!body.name || body.name.length < 1) {
    result.success = false;
    result.errors.name = "Name must be at least 1 character long.";
  }
  // Validate Username
  if (!body.username || body.username.length < 3 || body.username.length > 30) {
    result.success = false;
    result.errors.username = "Username must be between 3 and 30 characters long.";
  }
  // Validate Email
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    result.success = false;
    result.errors.email = "Please enter a valid email address.";
  }
  // Validate Password
  if (!body.password || body.password.length < 8) {
    result.success = false;
    result.errors.password = "Password must be at least 8 characters long.";
  }

  if (!result.success) {
    return result;
  }

  try {
    await auth.api.signUpEmail({ body });
  } catch (error) {
    if (error instanceof APIError) {
      console.warn("Error signing up:", error.body?.code, error.body?.message);
      if (error.body?.code === "USERNAME_IS_ALREADY_TAKEN_PLEASE_TRY_ANOTHER") {
        return {
          success: false,
          errors: {
            username: "Username is already taken, please try another.",
          },
          inputs: body,
        };
      } else if (error.body?.code === "USER_ALREADY_EXISTS") {
        return {
          success: false,
          errors: {
            email: "Email is already registered.",
          },
          inputs: body,
        };
      }
    } else {
      return {
        success: false,
        message: "Something went wrong.",
        errors: {},
        inputs: body,
      };
    }
  }
  return { success: true, message: "User created successfully", errors: {} };
};
