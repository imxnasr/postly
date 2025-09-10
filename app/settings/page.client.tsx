"use client";

import { updateUser } from "@/lib/auth-client";
import { Logout } from "@/components/Logout";
import { Button, Input, Separator, Textarea } from "@/components/ui";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Loader } from "@/components";

export default ({ userInfo }: any) => {
  const [isPending, setIsPending] = useState(false);
  // const [name, setName] = useState(userInfo?.name || "");
  // const [username, setUsername] = useState(userInfo?.username || "");
  // const [email, setEmail] = useState(userInfo?.email || "");
  // const [bio, setBio] = useState(userInfo?.bio || "");

  const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
    username: z
      .string()
      .min(2, "Username must be at least 2 characters")
      .max(30, "Username must be less than 30 characters"),
    email: z.email("Invalid email").transform((email) => email.toLowerCase()),
    bio: z.string().max(200, "Bio must be less than 200 characters"),
  });

  type FormSchema = z.infer<typeof formSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userInfo?.name || "",
      username: userInfo?.username || "",
      email: userInfo?.email || "",
      bio: userInfo?.bio || "",
    },
  });

  const onSubmit = async (data: FormSchema) => {
    setIsPending(true);
    try {
      // const res = await updateUser(data);
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
                  {/*<Input placeholder="Bio" {...field} value={field.value || ""} />*/}
                  <Textarea placeholder="Bio" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full mt-6">
          {isPending ? <Loader /> : "Save"}
        </Button>
        <Separator className="mt-6" />
        <Logout />
      </form>
    </Form>
  );
};
