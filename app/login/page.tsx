"use client";

import React, { useActionState, useEffect } from "react";
import { Button, Input } from "@/components/ui";
import { login } from "@/actions/login";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Loader } from "@/components/Loader";

const initialState: any = { success: false, message: "", errors: {}, inputs: {} };

export default () => {
  const [state, action, isPending] = useActionState(login, initialState);
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
      <h3 className="text-2xl font-bold mb-5">Login</h3>
      {/* Inputs */}
      <div className="space-y-3">
        {/* Email Input */}
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="text">Username or Email</label>
          <Input
            id="text"
            name="text"
            type="text"
            placeholder="Username or Email"
            aria-describedby="text-error"
            defaultValue={state?.inputs?.text}
            className={!isPending && state?.errors?.text ? "border-red-500" : ""}
          />
          {!isPending && state?.errors?.text && (
            <p id="text-error" className="text-red-500 text-sm">
              {state.errors.text}
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
        Don't have an account?{" "}
        <Link href="/register" className="text-foreground hover:underline">
          Register
        </Link>
      </p>
      <Button type="submit" className="w-full mt-6" disabled={isPending}>
        {isPending ? <Loader /> : "Login"}
      </Button>
    </form>
  );
};
