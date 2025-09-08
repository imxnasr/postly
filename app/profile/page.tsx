import { Logout } from "@/components/Logout";
import { Button, Input, Separator, Textarea } from "@/components/ui";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const userInfo = session?.user;

  return (
    <form className="max-w-xl m-auto mt-6">
      <h3 className="text-2xl font-bold mb-5">User info</h3>
      {/* Inputs */}
      <div className="space-y-3">
        {/* Name Input */}
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="name">Name</label>
          <Input type="text" id="name" placeholder="John Doe" defaultValue={userInfo?.name || ""} />
        </div>
        {/* Username Input */}
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="username">Username</label>
          <Input type="text" id="username" placeholder="johndoe" defaultValue={userInfo?.username || ""} />
        </div>
        {/* Email Input */}
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="email">Email</label>
          <Input type="email" id="email" placeholder="john.doe@example.com" defaultValue={userInfo?.email || ""} />
        </div>
        {/* Bio Textarea */}
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="bio">Bio</label>
          <Textarea id="bio" placeholder="A short bio..." defaultValue={userInfo?.bio || ""} />
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
