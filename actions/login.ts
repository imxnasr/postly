"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";

interface LoginResponse {
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

export const login = async (_: any, formData: FormData): Promise<LoginResponse> => {
  const body = {
    text: formData.get("text") as string,
    password: formData.get("password") as string,
  };

  // check if this text is email or username

  let result: LoginResponse = {
    success: true,
    errors: {},
    inputs: body,
  };

  // Get form data

  if (!result.success) {
    return result;
  }

  try {
    if (body.text.includes("@")) {
      await auth.api.signInEmail({
        body: {
          email: body.text,
          password: body.password,
        },
      });
    } else {
      await auth.api.signInUsername({
        body: {
          username: body.text,
          password: body.password,
        },
      });
    }
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        message: error.body?.message + "." || "",
        errors: {},
        inputs: body,
      };
    } else {
      return {
        success: false,
        message: "Something went wrong.",
        errors: {},
        inputs: body,
      };
    }
  }
  return { success: true, message: "Logged in successfully", errors: {} };
};
