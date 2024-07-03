import type { Product as ProductApi } from "services/service-types";

export interface ProductSegment {
  label: string;
  products: ProductApi[];
}
