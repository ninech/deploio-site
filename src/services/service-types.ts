/* eslint-disable camelcase */
import type { CamelCaseKeys } from "camelcase-keys";

/**
 * This type represent the endpoint row response for the products, please use `Product` instead.
 */
type ProductRaw = {
  id: number;
  name: string;
  description_sale: string | false;
  display_name: string;
  type: string;
  currency_id: [number, string];
  list_price: number;
  active: boolean;
  categ_id: [number, string];
  sh_is_bundle: boolean;
  sh_bundle_product_ids: number[];
  bundle_products?: {
    id: number;
    sh_product_id: [number, string];
    sh_qty: number;
    sh_uom: [number, string];
    sh_price_unit: number;
    sh_price_subtotal: number;
  }[];
  categ_path: string[];
  help_text?: string;
};

export type Product = CamelCaseKeys<ProductRaw, true>;

export type ProductsResponse = Product[];
