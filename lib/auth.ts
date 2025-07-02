import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/db/schema";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins/username";

export const auth = betterAuth({
  // Adapter for the database
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),

  // Configure providers and options
  emailAndPassword: { enabled: true },
  account: {
    accountLinking: { enabled: true },
  },
  user: {
    additionalFields: {
      bio: {
        type: "string",
        required: false,
      },
      role: {
        type: "string",
        required: false,
        defaultValue: "USER",
        input: false, // don't allow user to set role
      },
    },
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
  baseURL: process.env.NEXT_PUBLIC_APP_URL!,
  secret: process.env.BETTER_AUTH_SECRET!,
  plugins: [
    nextCookies(),
    username({
      // Configure the username plugin options
      minUsernameLength: 3,
      maxUsernameLength: 30,
      usernameValidator: (username: string) => {
        // Validate the username
        const regex = /^[a-zA-Z0-9_]+$/;
        return regex.test(username);
      },
    }),
  ],
});
