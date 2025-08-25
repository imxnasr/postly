"use client";

import { Toggle } from "@/components/ui/Toggle";
import { Editor } from "@tiptap/react";
import { Bold, Heading2, Italic, List, ListOrdered, Strikethrough } from "lucide-react";
import { useMark } from "./tiptap-ui/mark-button";
import { Card } from "./ui";

export default ({ editor }: { editor: Editor | null }) => {
  useMark({
    editor,
    type: "bold",
    hideWhenUnavailable: true,
    onToggled: () => console.log("Mark toggled!"),
  });
  if (!editor) return null;
  return (
    <Card className="flex-row px-2 py-2 gap-2 rounded-md rounded-b-none">
      <Toggle
        variant="outline"
        pressed={editor.isActive("heading")}
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="h-4 w-4" />
      </Toggle>
      <Toggle
        variant="outline"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        variant="outline"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        variant="outline"
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Toggle
        variant="outline"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        variant="outline"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
    </Card>
  );
};
