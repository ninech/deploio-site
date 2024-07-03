import { HelpIcon } from "components/icons/HelpIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "components/ui/tooltip";

type Props = {
  helpText?: string;
};

export const HelpTextProduct = ({ helpText }: Props) => {
  if (!helpText) return null;

  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <HelpIcon />
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{helpText}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
