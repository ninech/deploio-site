import type { Meta, Story } from "@storybook/react";

import type { Product } from "services/service-types";
import type { CartItem } from "store/cart-store";

import { ProductShopping, type ProductShoppingProps } from "./product-shopping";

const productExample: Product = {
  id: 3289,
  name: "vCluster",
  descriptionSale:
    "vClusters only incur usage costs from the resources you consume",
  displayName: "vCluster",
  type: "service",
  currencyId: [5, "CHF"],
  listPrice: 0,
  active: true,
  categId: [111, "All / Nine Kubernetes Engine / Services"],
  shIsBundle: false,
  shBundleProductIds: [],
  categPath: ["All", "Nine Kubernetes Engine", "Services"],
  bundleProducts: [],
};

const cartItemExample: CartItem = {
  product: productExample,
  quantity: 1,
};

export default {
  title: "Components/ProductShopping",
  component: ProductShopping,
  argTypes: {
    cartItem: {
      control: {
        type: "object",
      },
    },
  },
} as Meta;

const Template: Story<ProductShoppingProps> = (args) => (
  <div>
    <ProductShopping {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  cartItem: cartItemExample,
};

export const WithMultipleQuantities = Template.bind({});

WithMultipleQuantities.args = {
  cartItem: {
    ...cartItemExample,
    quantity: 3,
  },
};

export const WithBundleProducts = Template.bind({});

WithBundleProducts.args = {
  cartItem: {
    ...cartItemExample,
    product: {
      ...productExample,
      shIsBundle: true,
      bundleProducts: [
        {
          id: 1,
          shProductId: [1, "Bundle Product 1"],
          shQty: 1,
          shUom: [1, "unit"],
          shPriceUnit: 100,
          shPriceSubtotal: 100,
        },
        {
          id: 2,
          shProductId: [2, "Bundle Product 2"],
          shQty: 2,
          shUom: [1, "unit"],
          shPriceUnit: 200,
          shPriceSubtotal: 400,
        },
      ],
    },
  },
};
