"use client";

import { createPost } from "@/actions/create-post";
import { Button, Input, Textarea } from "@/components/ui";
import Tiptap from "@/components/ui/Tiptap";
import { cn } from "@/lib/utils";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const initialState: any = { success: false, message: "", errors: {}, inputs: {} };

export default () => {
  const [state, action, isPending] = useActionState(createPost, initialState);
  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <form action={action} className="m-auto mt-8">
      <h3 className="text-2xl font-bold mb-5">Create post</h3>
      {/* Inputs */}
      <div className="space-y-3">
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="title">Title</label>
          <Input
            id="title"
            type="text"
            name="title"
            placeholder="Title"
            aria-describedby="title-error"
            defaultValue={state?.inputs?.title}
            className={cn("py-6 text-xl md:text-xl", !isPending && state?.errors?.title ? "border-red-500" : "")}
          />
          {!isPending && state?.errors?.title && (
            <p id="title-error" className="text-red-500 text-sm">
              {state.errors.title}
            </p>
          )}
        </div>
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="body">Body</label>
          {/* <Textarea */}
          {/*   id="body" */}
          {/*   name="body" */}
          {/*   placeholder="Body" */}
          {/*   aria-describedby="body-error" */}
          {/*   defaultValue={state?.inputs?.body} */}
          {/*   className={cn("text-lg md:text-lg h-40", !isPending && state?.errors?.body ? "border-red-500" : "")} */}
          {/* /> */}
          <Tiptap />
          {!isPending && state?.errors?.body && (
            <p id="body-error" className="text-red-500 text-sm">
              {state.errors.body}
            </p>
          )}
        </div>
      </div>
      <Button className="w-full mt-6" type="submit" disabled={isPending}>
        Create
      </Button>
    </form>
  );
};
