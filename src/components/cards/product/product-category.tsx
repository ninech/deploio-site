import { QuantInput } from "components/forms/quant-input";
import { StackIcon } from "components/icons/StackIcon";
import { BundleProducts } from "components/ui/product/bundle-products";
import { HelpTextProduct } from "components/ui/product/help-text-product";
import { PriceAmount } from "components/ui/product/price-amount-product";
import type { Product } from "services/service-types";
import { useCartStore } from "store/cart-store";

export type ProductCategoryProps = {
  product: Product;
};

export const ProductCategory = ({ product }: ProductCategoryProps) => {
  const { changeQuantity, removeFromCart, addToCart, cartItems } =
    useCartStore();

  const cartItem = cartItems.find((item) => item.product.id === product.id);

  const quantity = cartItem ? cartItem.quantity : 0;

  const onIncrement = () => {
    const newQuant = quantity + 1;

    if (newQuant === 1) {
      addToCart(product);
    } else {
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
    if (newQuant > 0) {
      if (quantity === 0) {
        addToCart(product, newQuant);
      } else {
        changeQuantity(product.id, newQuant);
      }
    }
    if (newQuant === 0) {
      removeFromCart(product.id);
    }
  };

  return (
    <div
      className="flex flex-col gap-1 border-b border-nine-gray-200 px-4 py-4 last:border-b-0"
      aria-label="product-block"
    >
      <div className="flex justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h3 className="inline-flex items-center gap-1 text-base font-medium text-nine-primary-900">
            {product.bundleProducts && product.bundleProducts.length > 0 && (
              <StackIcon />
            )}
            <span>{product.displayName}</span>
            <HelpTextProduct helpText={product.helpText} />
          </h3>
          <p className="text-sm font-normal text-nine-primary-600">
            {product.descriptionSale}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <PriceAmount product={product} />
          <QuantInput
            quantity={quantity}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onChangeQuantity={onChangeQuantity}
          />
        </div>
      </div>
      <BundleProducts bundleProducts={product.bundleProducts} />
    </div>
  );
};
