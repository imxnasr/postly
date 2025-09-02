import { cn } from "@/lib/utils";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

interface ContentProps {
  className?: string;
  children: string;
}

export const CleanHTML: React.FC<ContentProps> = ({ className, children }) => {
  const window = new JSDOM("").window;
  const DOMPurifyServer = DOMPurify(window);
  const cleanHTML = DOMPurifyServer.sanitize(children);
  return <div className={cn("prose prose-invert", className)} dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
};
