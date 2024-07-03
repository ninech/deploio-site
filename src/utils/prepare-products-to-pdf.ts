import type { CartItem } from "store/cart-store";

import { formatProductCurrency } from "./format-product-currency";

interface TableRowPDF {
  name: string;
  quantity: number;
  price: string;
}

export const prepareProductsToPDF = (cartItems: CartItem[]): TableRowPDF[] => {
  const rows = cartItems.map((cartItem) => {
    const title = cartItem.product.displayName;

    const addons = cartItem.product.bundleProducts
      ?.map((addon) => `${addon.shProductId[1]} x${addon.shQty}`)
      .join(", ");

    const name = [title, addons].filter((v) => !!v).join("\n");
    const row: TableRowPDF = {
      quantity: cartItem.quantity,
      price: formatProductCurrency(cartItem.product),
      name,
    };

    return row;
  });

  return rows;
};
