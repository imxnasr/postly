import React from "react";
import { Button, Input, Textarea } from "@/components/ui";
import Form from "next/form";

export default () => {
  return (
    <Form action="" className="m-auto mt-8">
      <h3 className="text-2xl font-bold mb-5">Create post</h3>
      {/* Inputs */}
      <div className="space-y-3">
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="title">Title</label>
          <Input type="text" id="title" placeholder="Title" className="py-6 text-xl md:text-xl" />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <label htmlFor="body">Body</label>
          <Textarea id="body" placeholder="Body" className="text-lg md:text-lg h-40" />
        </div>
      </div>
      <Button className="w-full mt-6" type="submit">
        Create
      </Button>
    </Form>
  );
};
