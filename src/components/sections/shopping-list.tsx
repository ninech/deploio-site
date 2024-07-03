import { useEffect, useRef, useState } from "react";

import { ProductShopping } from "components/cards/product/product-shopping";
import { Button, type ButtonVariantProps } from "components/ui/button";
import { downloadShoppingListPDF } from "features/shopping-list-pdf/shopping-list-pdf";
import { type CartItem, useCartStore } from "store/cart-store";
import { formatProductCurrency } from "utils/format-product-currency";
import { generateCreateOrderMailToUrl } from "utils/generate-create-order-mail-to-url";
import { prepareProductsToPDF } from "utils/prepare-products-to-pdf";

import { MobileBottom } from "./mobile-bottom";

export const ShoppingList = () => {
  const triggerElementRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const productListRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  const { cartItems } = useCartStore();

  const getTotalPrice = calcTotalPrice(cartItems);

  const totalFormatted = formatProductCurrency({
    listPrice: getTotalPrice,
    currencyId: cartItems?.[0]?.product.currencyId,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (bottomBarRef.current && triggerElementRef.current) {
        const triggerRect = triggerElementRef.current.getBoundingClientRect();
        setIsVisible(triggerRect.top > window.innerHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onDownload = () => {
    const cart = prepareProductsToPDF(cartItems);

    downloadShoppingListPDF({ cart, total: totalFormatted });
  };

  const onCreateOrder = () => {
    const mailtoUrl = generateCreateOrderMailToUrl(cartItems, totalFormatted);

    window.location.href = mailtoUrl;
  };

  const handleProductSelectClick = () => {
    if (productListRef.current) {
      productListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="border-nine-gray-200 sm:rounded-3xl md:border relative overflow-hidden">
      <img src="/images/wave.svg" alt="wave" className="absolute w-[251%] z-[0] max-w-[9999%] top-[-8rem] left-[-140%]" />
      <div className="flex flex-col gap-4 border-b border-nine-gray-200 p-4 last:border-b-0 sm:gap-5 sm:rounded-t-3xl sm:p-5 md:gap-10 md:bg-nine-tertiary md:p-10 z-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1
            className="text-lg font-semibold leading-8 text-nine-primary-900"
            ref={productListRef}
          >
            Selected Products
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center gap-5 relative">
            <img
              src="/empty-cart.png"
              alt="empty shopping list"
              className="h-[74px] w-[73px]"
            />
            <div className="text-center font-bold text-nine-primary-900">
              No items selected yet
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-nine-gray-200 bg-white shadow-nine-card relative">
            <ul>
              {cartItems.map((cartItem) => (
                <ProductShopping
                  key={cartItem.product.id}
                  cartItem={cartItem}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between border-b border-nine-gray-200 bg-nine-tertiary px-5 py-5 last:rounded-b-3xl last:border-b-0 md:bg-white md:px-14 z-5 relative">
        <div className="text-lg font-semibold text-nine-primary-600">
          Total
        </div>
        <div className="inline-flex items-baseline gap-2">
          <span className="text-3xl font-semibold text-nine-primary-900">
            {totalFormatted}
          </span>
          <span className="text-lg font-normal text-nine-primary-600">
            /mo
          </span>
        </div>
      </div>
      <div
        ref={triggerElementRef}
        className="flex flex-col gap-5 bg-white p-4 last:rounded-b-3xl sm:p-5 md:bg-nine-tertiary md:p-10"
      >
        <InfoShoppingCard
          title="Download your current selections"
          description="Save a PDF of your current selections for reference"
          buttonText="Download"
          buttonVariant="outline-secondary"
          disabled={cartItems.length === 0}
          onClick={onDownload}
        />
        <InfoShoppingCard
          title="Place your order"
          description="Email your order specification to Nine's sales team"
          buttonText="Create order"
          buttonVariant="default"
          disabled={cartItems.length === 0}
          onClick={onCreateOrder}
        />
      </div>
      <MobileBottom
        isVisible={isVisible}
        productsAmount={cartItems.length}
        disabled={cartItems.length === 0}
        onCreateOrder={onCreateOrder}
        onDownload={onDownload}
        totalFormatted={totalFormatted}
        bottomBarRef={bottomBarRef}
        onProductSelectClick={handleProductSelectClick}
      />
    </section>
  );
};

type InfoShoppingCardProps = {
  title: string;
  description: string;
  buttonText: string;
  buttonVariant: ButtonVariantProps["variant"];
  disabled: boolean;
  onClick?: () => void;
};

const InfoShoppingCard = ({
  buttonText,
  buttonVariant,
  description,
  title,
  disabled,
  onClick,
}: InfoShoppingCardProps) => {
  return (
    <div className="flex flex-col items-start gap-3 rounded-xl border border-nine-gray-200 bg-white p-5 shadow-nine-card md:flex-row md:items-center md:justify-between md:gap-0 relative">
      <div className="flex flex-col gap-2">
        <h5 className="text-lg font-semibold text-nine-primary-900">
          {title}
        </h5>
        <p className="text-sm font-normal text-nine-primary-600">
          {description}
        </p>
      </div>
      <Button
        variant={buttonVariant}
        size="default"
        disabled={disabled}
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </div>
  );
};

function calcTotalPrice(cartItems: CartItem[]) {
  return cartItems.reduce((total, cartItem) => {
    return total + cartItem.product.listPrice * cartItem.quantity;
  }, 0);
}
