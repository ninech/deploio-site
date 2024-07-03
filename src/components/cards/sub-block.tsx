import clsx from "clsx";
import { useState } from "react";

import { ChevronBottomSmallIcon } from "components/icons/ChevronBottomSmallIcon";
import { ChevronTopSmallIcon } from "components/icons/ChevronTopSmallIcon";
import { Button } from "components/ui/button";
import type { ProductSegment } from "types";

import { ProductCategory } from "./product/product-category";

type SubBlockProps = {
  segment: ProductSegment;
  openByDefault?: boolean;
};

export const SubBlock = ({ segment, openByDefault = false }: SubBlockProps) => {
  const [isOpen, setIsOpen] = useState(openByDefault);

  const onToggleSubBlock = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="group border-b bg-white last:rounded-b-xl last:border-0">
      <div
        className={clsx("border-nine-gray-200 bg-nine-tertiary", {
          "border-b": isOpen,
          "group-last:rounded-b-xl": !isOpen,
        })}
      >
        <div className="flex items-center justify-between px-4 py-1">
          <h4 className="font-inter-tight text-sm font-medium">
            {segment.label}
          </h4>
          <Button
            variant="ghost"
            size="icon-sm"
            type="button"
            onClick={onToggleSubBlock}
          >
            {isOpen ? <ChevronTopSmallIcon /> : <ChevronBottomSmallIcon />}
          </Button>
        </div>
      </div>
      <div
        className={clsx({
          hidden: !isOpen,
          block: isOpen,
        })}
      >
        {segment.products.length === 0 && (
          <div className="rounded-b-xl bg-white p-4 text-center text-xs  font-semibold text-nine-primary-900">
            No products to show
          </div>
        )}
        {segment.products.map((product) => (
          <ProductCategory product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};
