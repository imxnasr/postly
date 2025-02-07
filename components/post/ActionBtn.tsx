import { FC } from "react";
import { Button } from "../ui";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/Tooltip";
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
          <Button variant={"outline"} className="flex items-center gap-1 rounded-full px-2 border-none shadow-none">
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
