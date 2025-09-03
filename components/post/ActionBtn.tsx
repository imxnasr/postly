import { formatNumber } from "@/lib/formatters";
import { FC } from "react";
import { Loader } from "../Loader";
import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui";

interface ActionBtnProps extends React.ComponentPropsWithoutRef<"button"> {
  name: string;
  num: number;
  Icon: any;
  isLoading?: boolean;
}

export const ActionBtn: FC<ActionBtnProps> = ({ name, num, Icon, isLoading, ...props }) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            {...props}
            disabled={isLoading}
            variant="ghost"
            className="bg-transparent flex items-center gap-1 rounded-full px-2 shadow-none"
          >
            {isLoading ? <Loader /> : <Icon />}
            <span>{formatNumber(num)}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>{name}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
