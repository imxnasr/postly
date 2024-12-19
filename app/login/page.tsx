import React from "react";
import Form from "next/form";
import { Button, Input } from "@/components/ui";

export default () => {
  return (
    <Form action="" className="max-w-xl m-auto mt-8">
      <h3 className="text-2xl font-bold mb-5">Login</h3>
      {/* Inputs */}
      <div className="space-y-3">
        {/* Email Input */}
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="email">Email</label>
          <Input type="email" id="email" placeholder="Email" />
        </div>
        {/* Name Input */}
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="password">Password</label>
          <Input type="password" id="password" placeholder="Password" />
        </div>
      </div>
      <Button type="submit" className="w-full mt-6">
        Login
      </Button>
    </Form>
  );
};
