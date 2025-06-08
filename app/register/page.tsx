"use client";

import React, { useEffect } from "react";
import { Button, Input } from "@/components/ui";
import { register } from "../actions/register";
import { useActionState } from "react";
import { Loader } from "@/components/Loader";
import { useRouter } from "next/navigation";

const initialState: any = {
  success: false,
  message: "",
};

export default () => {
  const [state, action, isPending] = useActionState(register, initialState);
  const router = useRouter();
  useEffect(() => {
    if (state.success) {
      router.push("/login");
    }
  }, [state.success]);
  return (
    <form action={action} className="max-w-xl m-auto mt-8" autoComplete="on">
      <h3 className="text-2xl font-bold mb-5">Register</h3>
      {/* Inputs */}
      <div className="space-y-3">
        {/* Username Input */}
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="username">Username</label>
          <Input
            id="username"
            name="username"
            type="text"
            required
            placeholder="Username"
            aria-describedby="username-error"
            defaultValue={state.inputs?.username}
            className={!isPending && state?.errors?.username ? "border-red-500" : ""}
          />
          {!isPending && state?.errors?.username && (
            <p id="username-error" className="text-red-500 text-sm">
              {state.errors.username}
            </p>
          )}
        </div>
        {/* Email Input */}
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Email"
            aria-describedby="email-error"
            defaultValue={state.inputs?.email}
            className={!isPending && state?.errors?.email ? "border-red-500" : ""}
          />
          {!isPending && state?.errors?.email && (
            <p id="email-error" className="text-red-500 text-sm">
              {state.errors.email}
            </p>
          )}
        </div>
        {/* Name Input */}
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Password"
            aria-describedby="password-error"
            defaultValue={state.inputs?.password}
            className={!isPending && state?.errors?.password ? "border-red-500" : ""}
          />
          {!isPending && state?.errors?.password && (
            <p id="password-error" className="text-red-500 text-sm">
              {state.errors.password}
            </p>
          )}
        </div>
      </div>
      <Button type="submit" className="w-full mt-6">
        {isPending ? <Loader /> : "Register"}
      </Button>
    </form>
  );
};
