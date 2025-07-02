import { inferAdditionalFields, usernameClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { auth } from "./auth";

export const { signIn, signUp, signOut, getSession, useSession } = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL!,
  plugins: [usernameClient(), inferAdditionalFields<typeof auth>()],
});

export const session = await getSession();
