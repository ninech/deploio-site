import type { Product } from "services/service-types";

export const formatProductCurrency = (
  product: Pick<Product, "listPrice" | "currencyId">
) => {
  const listPriceFormatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
  }).format(product.listPrice);

  return [product.currencyId?.[1], listPriceFormatted]
    .filter((v) => !!v)
    .join(" ");
};
