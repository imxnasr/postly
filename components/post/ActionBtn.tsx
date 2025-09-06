import { formatNumber } from "@/lib/formatters";
import { FC } from "react";
import { Loader } from "../Loader";
import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui";

interface ActionBtnProps extends React.ComponentPropsWithoutRef<"button"> {
  name: string;
  num: number;
  Icon: any;
  ActiveIcon: any;
  active?: boolean;
  isLoading?: boolean;
  onClickActive?: () => void;
  onClickInActive?: () => void;
}

export const ActionBtn: FC<ActionBtnProps> = ({
  name,
  num,
  Icon,
  ActiveIcon,
  active = false,
  isLoading,
  onClickActive,
  onClickInActive,
  ...props
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            {...props}
            onClick={!active ? onClickActive : onClickInActive}
            disabled={isLoading}
            variant="ghost"
            className="bg-transparent flex items-center gap-1 rounded-full px-2 shadow-none"
          >
            {isLoading ? <Loader /> : active ? <ActiveIcon /> : <Icon />}
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
