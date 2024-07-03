import type { CartItem } from "store/cart-store";
import { formatProductCurrency } from "utils/format-product-currency";

export const generateCreateOrderMailToUrl = (
  cartItems: CartItem[],
  totalFormatted: string
) => {
  const subject = "Customer Order Enquiry";
  const body = generatedEmailBody(cartItems, totalFormatted);
  const toAddress = "support@nine.ch";

  return `mailto:${toAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export const generatedEmailBody = (
  cartItems: CartItem[],
  totalFormatted: string
): string => {
  const products = generatedProductList(cartItems);
  const body = `Dear Nine,\n\nWe would like to order the following services, which were configured via your pricing calculator:\n\n${products}\n\nTotal ${totalFormatted}`;
  return body;
};

export const generatedProductList = (cartItems: CartItem[]) => {
  return cartItems
    .map((cartItem) => {
      const price = formatProductCurrency({
        listPrice: cartItem.product.listPrice,
        currencyId: cartItems[0].product.currencyId,
      });
      return `${cartItem.product.displayName} - x${cartItem.quantity} - ${price}`;
    })
    .join("\n");
};

/*

 

  const onCreateOrder = () => {
    const products = generatedProducts();
    const subject = "Customer Order Enquiry";
    const body = `Dear Nine,\n\nWe would like to order the following services, which were configured via your pricing calculator:\n\n${products}\n\nTotal ${totalFormatted}`;
    const toAddress = "support@nine.ch";
    const mailtoUrl = `mailto:${toAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  };
  */
