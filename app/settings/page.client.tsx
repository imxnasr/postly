"use client";

import { Loader } from "@/components/Loader";
import { Logout } from "@/components/Logout";
import { Button, Input, Separator, Textarea } from "@/components/ui";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { updateUser } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export default ({ userInfo }: any) => {
  const [isPending, setIsPending] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
    // email: z.email("Invalid email").transform((email) => email.toLowerCase()),
    username: z
      .string()
      .min(2, "Username must be at least 2 characters")
      .max(50, "Username must be less than 50 characters"),
    bio: z.string().max(200, "Bio must be less than 200 characters"),
  });

  type FormSchema = z.infer<typeof formSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userInfo?.name || "",
      // email: userInfo?.email || "",
      username: userInfo?.username || "",
      bio: userInfo?.bio || "",
    },
  });

  const onSubmit = async (data: FormSchema) => {
    setIsPending(true);
    try {
      const res = await updateUser({
        name: data.name,
        username: data.username,
        bio: data.bio,
      });
      if (res.data?.status) {
        toast.success("User updated successfully.");
      } else {
        toast.error("Failed to update user.");
      }
    } catch (error) {
      toast.error("Failed to update user");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl m-auto mt-6">
        <h3 className="text-2xl font-bold mb-5">User info</h3>
        {/* Inputs */}
        <div className="space-y-3">
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

          {/* Username Input */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bio Textarea */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="Bio" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full mt-6" disabled={isPending}>
          {isPending ? <Loader /> : "Save"}
        </Button>
        <Separator className="mt-6" />
        <Logout disabled={isPending} />
      </form>
      <Separator className="mt-6" />
      <div className="max-w-xl m-auto mt-6">
        <h3 className="text-2xl font-bold mb-5">Theme</h3>
        {mounted && (
          <Select value={theme} onValueChange={(value) => setTheme(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
    </Form>
  );
};
