import { QuantInput } from "components/forms/quant-input";
import { StackIcon } from "components/icons/StackIcon";
import { TrashIcon } from "components/icons/TrashIcon";
import { Button } from "components/ui/button";
import { BundleProducts } from "components/ui/product/bundle-products";
import { HelpTextProduct } from "components/ui/product/help-text-product";
import { PriceAmount } from "components/ui/product/price-amount-product";
import { type CartItem, useCartStore } from "store/cart-store";

export type ProductShoppingProps = {
  cartItem: CartItem;
};

export const ProductShopping = ({ cartItem }: ProductShoppingProps) => {
  const { removeFromCart, changeQuantity } = useCartStore();
  const { product, quantity } = cartItem;

  const onIncrement = () => {
    const newQuant = quantity + 1;

    if (newQuant > 1) {
      changeQuantity(product.id, newQuant);
    }
  };

  const onDecrement = () => {
    const newQuant = quantity - 1;

    if (newQuant === 0) {
      removeFromCart(product.id);
    } else {
      changeQuantity(product.id, newQuant);
    }
  };

  const onChangeQuantity = (newQuant: number) => {
    if (newQuant === 0) {
      removeFromCart(product.id);
    } else {
      changeQuantity(product.id, newQuant);
    }
  };

  const handleDelete = () => {
    removeFromCart(product.id);
  };

  return (
    <div
      className="border-b border-nine-gray-200 px-4 py-4 last:border-b-0"
      aria-label="product-block"
    >
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="inline-flex items-center gap-1 text-base font-medium text-nine-primary-900">
            {product.bundleProducts && product.bundleProducts.length > 0 && (
              <StackIcon />
            )}
            <span>{product.displayName}</span>
            <HelpTextProduct helpText={product.helpText} />
          </h3>
          <p className="font-inter-tight text-sm font-normal text-nine-primary-600">
            {product.descriptionSale}
          </p>
          <BundleProducts bundleProducts={product.bundleProducts} />
        </div>
        <div className="flex flex-row items-center justify-between gap-4 md:justify-normal">
          <PriceAmount product={product} />
          <QuantInput
            quantity={quantity}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onChangeQuantity={onChangeQuantity}
          />
          <Button variant="ghost" size="icon" onClick={handleDelete}>
            <TrashIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};
