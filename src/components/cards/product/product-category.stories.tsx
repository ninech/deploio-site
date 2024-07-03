import type { Meta, Story } from "@storybook/react";

import type { Product } from "services/service-types";

import { ProductCategory, type ProductCategoryProps } from "./product-category";

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

export default {
  title: "Components/ProductCategory",
  component: ProductCategory,
  argTypes: {
    product: {
      control: {
        type: "object",
      },
    },
  },
} as Meta;

const Template: Story<ProductCategoryProps> = (args) => (
  <div>
    <ProductCategory {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  product: productExample,
};

export const WithBundleProducts = Template.bind({});

WithBundleProducts.args = {
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
};
