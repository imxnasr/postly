"use client";

import { login } from "@/actions/login";
import { Loader } from "@/components/Loader";
import { Button, Input } from "@/components/ui";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default () => {
  const [isPending, setIsPending] = useState(false);

  const formSchema = z.object({
    usernameOrEmail: z
      .string()
      .min(1, "Username or email is required")
      .refine((val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || /^[a-zA-Z0-9_]+$/.test(val), {
        message: "Must be a valid email or username",
      }),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

  type FormSchema = z.infer<typeof formSchema>;

  const form = useForm<FormSchema>({
    // @ts-ignore
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (formData: FormSchema) => {
    setIsPending(true);
    const res = await login(formData);
    if (res.success) {
      toast.success(res.message);
      redirect("/");
    } else {
      toast.error(res.message);
    }
    setIsPending(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl m-auto mt-8" autoComplete="on">
        <h3 className="text-2xl font-bold mb-5">Login</h3>
        {/* Inputs */}
        <div className="space-y-3">
          {/* Email Input */}
          <FormField
            control={form.control}
            name="usernameOrEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username or Email</FormLabel>
                <FormControl>
                  <Input placeholder="Username or Email" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Password Input */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
    </Form>
  );
};
