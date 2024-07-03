import type { Product } from "services/service-types";
import { formatProductCurrency } from "utils/format-product-currency";

type Props = {
  product: Product;
};

export const PriceAmount = ({ product }: Props) => {
  return (
    <div className="flex items-center gap-1 whitespace-nowrap">
      <span className="text-sm font-medium text-nine-primary-900">
        {formatProductCurrency(product)}
      </span>
      <span className="text-xs text-nine-primary-600">
        /mo
      </span>
    </div>
  );
};
