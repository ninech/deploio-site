import clsx from "clsx";

import { DotIcon } from "components/icons/DotIcon";
import { Button } from "components/ui/button";

type MobileBottomProps = {
  onCreateOrder: () => void;
  onDownload: () => void;
  disabled: boolean;
  productsAmount: number;
  totalFormatted: string;
  bottomBarRef: React.RefObject<HTMLDivElement>;
  isVisible: boolean;
  onProductSelectClick: () => void;
};

export const MobileBottom = ({
  onDownload,
  onCreateOrder,
  disabled,
  totalFormatted,
  productsAmount,
  bottomBarRef,
  isVisible,
  onProductSelectClick,
}: MobileBottomProps) => {
  if (productsAmount === 0) {
    return null;
  }

  return (
    <div
      ref={bottomBarRef}
      className={clsx(
        "fixed bottom-0 left-0 right-0 flex w-full flex-col gap-4 border-t border-nine-gray-200 bg-white px-5 py-3  shadow transition-transform duration-300 lg:hidden",
        {
          "translate-y-0": isVisible,
          "translate-y-full": !isVisible,
        }
      )}
    >
      <div className="flex justify-between">
        <div className="inline-flex items-center gap-1">
          <DotIcon />

          <button
            type="button"
            className="font-montserrat text-xs font-medium text-nine-primary"
            onClick={onProductSelectClick}
          >
            {productsAmount} product{productsAmount === 1 ? "" : "s"} selected
          </button>
        </div>
        <div className="flex items-center gap-1 whitespace-nowrap">
          <span className="font-montserrat text-lg font-medium text-nine-primary-900">
            {totalFormatted}
          </span>
          <span className="font-montserrat text-sm text-nine-primary-600">
            /mo
          </span>
        </div>
      </div>
      <div className="flex justify-stretch gap-4">
        <Button
          variant="outline-secondary"
          size="default"
          className="w-1/2"
          disabled={disabled}
          onClick={onDownload}
        >
          Download
        </Button>
        <Button
          variant="default"
          size="default"
          className="w-1/2"
          disabled={disabled}
          onClick={onCreateOrder}
        >
          Create order
        </Button>
      </div>
    </div>
  );
};
