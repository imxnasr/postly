"use client";

import { register } from "@/actions/register";
import { Loader } from "@/components/Loader";
import { Button, Input, Separator } from "@/components/ui";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { signIn } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export default () => {
  const [isPending, setIsPending] = useState(false);

  const formSchema = z.object({
    name: z.string().min(1, "Name must be at least 1 characters").max(50, "Name must be at most 50 characters"),
    email: z.email("Invalid email address").transform((val) => val.toLowerCase()),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  });

  type FormSchema = z.infer<typeof formSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSbumit = async (formData: FormSchema) => {
    setIsPending(true);
    const res = await register(formData);
    if (res.success) {
      toast.success(res.message);
      redirect("/");
    } else {
      toast.error(res.message);
    }
    setIsPending(false);
  };

  const signInWithGitHub = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await signIn.social({
        provider: "github",
        fetchOptions: {
          onRequest: () => {
            setIsPending(true);
          },
          onResponse: () => {
            setIsPending(false);
          },
          onSuccess: () => {
            toast.success("Successfully signed in with GitHub.");
            redirect("/");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        },
      });
      console.log("SIGN IN WITH GITHUB", data);
    } catch (error: any) {
      console.log("ERROR", JSON.parse(error));
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSbumit)} className="max-w-xl m-auto mt-8" autoComplete="on">
        <h3 className="text-2xl font-bold mb-5">Register</h3>
        {/* Inputs */}
        <div className="space-y-3">
          <Button type="button" onClick={signInWithGitHub} variant="secondary" className="w-full " disabled={isPending}>
            {isPending ? <Loader /> : "GitHub"}
          </Button>
          <Separator className="my-6" />
          {/* Name Input */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Email Input */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} value={field.value || ""} />
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
          Already have an account?{" "}
          <Link href="/login" className="text-foreground hover:underline">
            Login
          </Link>
        </p>
        <Button type="submit" className="w-full mt-6" disabled={isPending}>
          {isPending ? <Loader /> : "Register"}
        </Button>
      </form>
    </Form>
  );
};
