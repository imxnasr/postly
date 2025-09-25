"use client";

import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

export default async (setIsPending: React.Dispatch<React.SetStateAction<boolean>>) => {
  try {
    setIsPending(true);
    const data = await signIn.social({
      provider: "github",
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onSuccess: (ctx) => {
          console.log("SUCCESS", ctx);
          toast.success("Successfully signed in, redirecting...");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
          setIsPending(false);
        },
      },
    });

    console.log("SIGN IN WITH GITHUB", data);
  } catch (error: any) {
    console.log("ERROR", error);
  }
};
