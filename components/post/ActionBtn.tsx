import { FC } from "react";
import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui";
import { formatNumber } from "@/utils/formatters";

interface ActionBtnProps extends React.ComponentPropsWithoutRef<"button"> {
  name: string;
  num: number;
  Icon: any;
}

export const ActionBtn: FC<ActionBtnProps> = ({ name, num, Icon }) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button variant="ghost" className="bg-transparent flex items-center gap-1 rounded-full px-2 shadow-none">
            <Icon size={20} />
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
