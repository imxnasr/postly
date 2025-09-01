"use client";

import DOMPurify from "dompurify";

interface ContentProps {
  children: string;
}

export const Content: React.FC<ContentProps> = ({ children }) => {
  const cleanHTML = DOMPurify.sanitize(children);
  return (
    <div
      className="text-md line-clamp-3 leading-5 text-muted-foreground my-2"
      dangerouslySetInnerHTML={{ __html: cleanHTML }}
    />
  );
};
