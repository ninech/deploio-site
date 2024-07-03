import clsx from "clsx";
import { useState } from "react";

import { ChevronBottomIcon } from "components/icons/ChevronBottomIcon";
import { ChevronTopIcon } from "components/icons/ChevronTopIcon";
import { Button } from "components/ui/button";
import type { Product } from "services/service-types";
import { type CartItem, useCartStore } from "store/cart-store";
import type { ProductSegment } from "types";

import { ProductCount } from "./product-count";
import { ProductCategory } from "./product/product-category";
import { SubBlock } from "./sub-block";

export type BlockProps = {
  title: string;
  segments: ProductSegment[];
  products: Product[];
};

export const Block = ({ title, segments, products }: BlockProps) => {
  const [isOpenBlock, setIsOpenBlock] = useState(false);

  const { cartItems } = useCartStore();

  const productSelected = getProductSelected(cartItems, segments, products);

  const onToggleCollapseBlock = () => {
    setIsOpenBlock(!isOpenBlock);
  };

  const onlyOneSegment = segments.length === 1;

  return (
    <div className="rounded-xl border border-t-0 border-nine-gray-200 bg-nine-tertiary shadow-nine-card">
      <ProductCount amount={productSelected.length} />
      <div
        className={clsx(
          "inline-flex w-full  items-center justify-between rounded-xl border-t border-nine-gray-200 bg-nine-primary px-3 py-2 text-lg font-semibold text-white",
          {
            "rounded-b-none": isOpenBlock,
          }
        )}
      >
        <span>{title}</span>
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={onToggleCollapseBlock}
        >
          {isOpenBlock ? (
            <ChevronTopIcon className="text-white" />
          ) : (
            <ChevronBottomIcon className="text-white" />
          )}
        </Button>
      </div>
      <div
        className={clsx("", {
          hidden: !isOpenBlock,
          block: isOpenBlock,
        })}
      >
        <div className="border-t border-nine-gray-200 bg-white last:rounded-b-xl">
          {products.map((product) => (
            <ProductCategory product={product} key={product.id} />
          ))}
        </div>
        {segments.map((segment) => (
          <SubBlock
            key={segment.label}
            segment={segment}
            openByDefault={onlyOneSegment}
          />
        ))}
      </div>
    </div>
  );
};

function getProductSelected(
  cartItems: CartItem[],
  segments: ProductSegment[],
  products: Product[]
) {
  const productOnCart = cartItems.map((cartItem) => cartItem.product.id);

  const productOnBlock = new Set([
    ...products.map((product) => product.id),
    ...segments.flatMap((segment) =>
      segment.products.map((product) => product.id)
    ),
  ]);

  const productSelected = productOnCart.filter((product) =>
    productOnBlock.has(product)
  );

  return productSelected;
}
