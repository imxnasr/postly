import { cn } from "@/lib/utils";
import DOMPurify from "dompurify";

interface ContentProps {
  className?: string;
  children: string;
}

export const CleanHTML: React.FC<ContentProps> = ({ className, children }) => {
  const cleanHTML = (() => {
    if (typeof window === "undefined") {
      // Server-side rendering
      const { JSDOM } = require("jsdom");
      const window = new JSDOM("").window;
      const DOMPurifyServer = DOMPurify(window as any);
      return DOMPurifyServer.sanitize(children);
    } else {
      // Client-side rendering
      return DOMPurify.sanitize(children);
    }
  })();

  return <div className={cn("prose prose-invert", className)} dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
};
