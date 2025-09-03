import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

export const Loader = ({ className }: { className?: string }) => (
  <LoaderCircle className={cn(`animate-spin`, className)} />
);
