"use client";

import React, { useActionState, useEffect } from "react";
import { Button, Input } from "@/components/ui";
import { register } from "@/actions/register";
import { Loader } from "@/components/Loader";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import Link from "next/link";

const initialState: any = { success: false, message: "", errors: {}, inputs: {} };

export default () => {
  const [state, action, isPending] = useActionState(register, initialState);
  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      redirect("/");
    } else {
      if (state.message) {
        toast.error(state.message);
      }
    }
  }, [state]);
  return (
    <form action={action} className="max-w-xl m-auto mt-8" autoComplete="on">
      <h3 className="text-2xl font-bold mb-5">Register</h3>
      {/* Inputs */}
      <div className="space-y-3">
        {/* Name Input */}
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="name">Name</label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            aria-describedby="name-error"
            defaultValue={state?.inputs?.name}
            className={!isPending && state?.errors?.name ? "border-red-500" : ""}
          />
          {!isPending && state?.errors?.name && (
            <p id="name-error" className="text-red-500 text-sm">
              {state.errors.name}
            </p>
          )}
        </div>
        {/* Username Input */}
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="username">Username</label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            aria-describedby="username-error"
            defaultValue={state?.inputs?.username}
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
            placeholder="Email"
            aria-describedby="email-error"
            defaultValue={state?.inputs?.email}
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
            placeholder="Password"
            aria-describedby="password-error"
            defaultValue={state?.inputs?.password}
            className={!isPending && state?.errors?.password ? "border-red-500" : ""}
          />
          {!isPending && state?.errors?.password && (
            <p id="password-error" className="text-red-500 text-sm">
              {state.errors.password}
            </p>
          )}
        </div>
      </div>
      <p className="text-muted-foreground text-sm mt-2">
        Already have an account?{" "}
        <Link href="/login" className="text-foreground hover:underline">
          Login
        </Link>
      </p>
      <Button type="submit" className="w-full mt-6" disabled={isPending}>
        {isPending ? <Loader /> : "Register"}
      </Button>
    </form>
  );
};
