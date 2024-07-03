import { Badge } from "components/ui/badge";
import type { Product } from "services/service-types";

type Props = {
  bundleProducts?: Product["bundleProducts"];
};

export const BundleProducts = ({ bundleProducts = [] }: Props) => {
  if (bundleProducts.length === 0) return null;

  return (
    <div className="flex gap-2">
      {bundleProducts.map((addon) => (
        <Badge key={addon.id}>
          {addon.shProductId[1]} x{addon.shQty}
        </Badge>
      ))}
    </div>
  );
};
