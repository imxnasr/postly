"use client";

import { createPost } from "@/actions/create-post";
import { Loader } from "@/components/Loader";
import Tiptap from "@/components/Tiptap";
import { Button, Input } from "@/components/ui";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export default () => {
  const [isPending, setIsPending] = useState(false);

  const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    body: z.string().min(1, "Body is required"),
  });

  type FormSchema = z.infer<typeof formSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: any) => {
    setIsPending(true);
    // const res = await createPost(data);
    // if (res.success) {
    //   toast.success(res.message);
    //   form.reset();
    // } else {
    //   toast.error(res.message);
    // }

    form.reset();

    setIsPending(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="m-auto mt-8">
        <h3 className="text-2xl font-bold mb-5">Create post</h3>

        {/* Inputs */}
        <div className="space-y-3">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Body */}
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Body</FormLabel>
                <FormControl>
                  <Tiptap onChange={field.onChange} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="w-full mt-6" type="submit" disabled={isPending}>
          {isPending ? <Loader /> : "Create"}
        </Button>
      </form>
    </Form>
  );
};
