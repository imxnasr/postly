"use client";

import { Loader } from "@/components/Loader";
import { Logout } from "@/components/Logout";
import { Button, Input, Separator, Textarea } from "@/components/ui";
import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export default () => {
  // const [state, action, isPending] = useActionState(login, initialState);
  const { data: session, isPending: isSessionPending } = useSession();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (session?.user) {
      const userInfo = session.user;
      setName(userInfo.name);
      setUsername(userInfo.username || "");
      setEmail(userInfo.email);
      setBio(userInfo.bio || "");
    }
  }, [session]);

  if (isSessionPending)
    return (
      <div className=" mx-auto">
        <Loader className="mx-auto" />
      </div>
    );
  return (
    <form className="max-w-xl m-auto mt-6">
      <h3 className="text-2xl font-bold mb-5">User info</h3>
      {/* Inputs */}
      <div className="space-y-3">
        {/* Name Input */}
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="name">Name</label>
          <Input type="text" id="name" placeholder="John Doe" defaultValue={name} />
        </div>
        {/* Username Input */}
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="username">Username</label>
          <Input type="text" id="username" placeholder="johndoe" defaultValue={username} />
        </div>
        {/* Email Input */}
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="email">Email</label>
          <Input type="email" id="email" placeholder="john.doe@example.com" defaultValue={email} />
        </div>
        {/* Bio Textarea */}
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="bio">Bio</label>
          <Textarea id="bio" placeholder="A short bio..." defaultValue={bio} />
        </div>
      </div>
      <Button type="submit" className="w-full mt-6" disabled>
        Save
      </Button>
      <Separator className="mt-6" />
      <Logout />
    </form>
  );
};
