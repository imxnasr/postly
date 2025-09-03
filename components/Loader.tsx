import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import { FC } from "react";

interface LoaderProps {
  size?: number;
  className?: string;
}

export const Loader: FC<LoaderProps> = ({ size = 20, className }) => (
  <LoaderCircle size={size} className={cn(`animate-spin`, className)} />
);
