import { Button, Input, Textarea } from "@/components/ui";

export default () => {
  return (
    <div className="max-w-xl m-auto">
      {/* <Card className="p-4 max-w-xl m-auto"> */}
      <h3 className="text-2xl font-bold mb-5">User</h3>
      {/* Inputs */}
      <div className="space-y-3">
        {/* Name Input */}
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="name">Name</label>
          <Input type="text" id="name" placeholder="John Doe" />
        </div>
        {/* Email Input */}
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="email">Email</label>
          <Input type="email" id="email" placeholder="john.doe@example.com" />
        </div>
        {/* Username Input */}
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="username">Username</label>
          <Input type="text" id="username" placeholder="johndoe" />
        </div>
        {/* Bio Textarea */}
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="bio">Bio</label>
          <Textarea id="bio" placeholder="A short bio..." />
        </div>
      </div>
      <Button className="w-full mt-6">Save</Button>
      {/* </Card> */}
    </div>
  );
};
