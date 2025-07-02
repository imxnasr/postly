"use client";

import React, { useEffect } from "react";
import { Button, Input, Textarea } from "@/components/ui";
import { getSession, signOut, useSession } from "@/lib/auth-client";
import { Loader } from "@/components/Loader";
import { useRouter } from "next/navigation";
import { Logout } from "@/components/Logout";

export default () => {
  const router = useRouter();
  // const [state, action, isPending] = useActionState(login, initialState);
  // const { data: session, error, isPending: isSessionPending } = useSession();
  const { data: session } = useSession();
  // console.log(session);
  useEffect(() => {
    console.log("SESSION:", session);
  }, [session]);

  return (
    <form className="max-w-xl m-auto mt-6">
      {/* <Card className="p-4 max-w-xl m-auto"> */}
      <h3 className="text-2xl font-bold mb-5">User info</h3>
      {/* Inputs */}
      <div className="space-y-3">
        {/* Name Input */}
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="name">Name</label>
          <Input type="text" id="name" placeholder="John Doe" />
        </div>
        {/* Username Input */}
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="username">Username</label>
          <Input type="text" id="username" placeholder="johndoe" />
        </div>
        {/* Email Input */}
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="email">Email</label>
          <Input type="email" id="email" placeholder="john.doe@example.com" />
        </div>
        {/* Bio Textarea */}
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="bio">Bio</label>
          <Textarea id="bio" placeholder="A short bio..." />
        </div>
      </div>
      <Button type="submit" className="w-full mt-6">
        Save
      </Button>
      <Logout />
      {/* </Card> */}
    </form>
  );
};
