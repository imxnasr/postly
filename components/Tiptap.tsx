"use client";

import { Placeholder } from "@tiptap/extensions";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import { useEffect } from "react";

const Tiptap = ({ onChange, value }: { onChange: (value: string) => void; value: string }) => {
  useEffect(() => {
    if (value.length < 1) {
      editor?.commands.clearContent();
    }
  }, [value]);

  const editor = useEditor({
    enableInputRules: false,
    enablePasteRules: false,
    onUpdate: ({ editor }) => {
      if (editor.getText().length > 0) {
        onChange(editor.getHTML());
      } else {
        onChange("");
      }
    },
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write something …",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "unset rounded-t-none prose max-w-none prose-ul dark:prose-invert flex flex-col border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-40 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      },
    },
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });
  return (
    <div className="">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
