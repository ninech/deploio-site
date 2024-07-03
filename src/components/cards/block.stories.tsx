import type { Meta, Story } from "@storybook/react";

import type { Product } from "services/service-types";
import type { ProductSegment } from "types";

import { Block, type BlockProps } from "./block";

const PRODUCTS: Product[] = [
  {
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
  },
  {
    id: 3032,
    name: "Cloudserver C1",
    descriptionSale: "1GiB RAM, 1 vCPU",
    displayName: "Cloudserver C1",
    type: "service",
    currencyId: [5, "CHF"],
    listPrice: 11,
    active: true,
    categId: [17, "All / Cloudserver"],
    shIsBundle: false,
    shBundleProductIds: [],
    categPath: ["All", "Cloudserver"],
  },
  {
    id: 3033,
    name: "Cloudserver C2",
    descriptionSale: "2GiB RAM, 1 vCPU",
    displayName: "Cloudserver C2",
    type: "service",
    currencyId: [5, "CHF"],
    listPrice: 22,
    active: true,
    categId: [17, "All / Cloudserver"],
    shIsBundle: false,
    shBundleProductIds: [],
    categPath: ["All", "Cloudserver"],
  },
  {
    active: true,
    categId: [111, "All / Nine Kubernetes Engine / Services"],
    categPath: ["All", "Nine Kubernetes Engine", "Services"],
    currencyId: [5, "CHF"],
    descriptionSale:
      "vClusters only incur usage costs from the resources you consume",
    displayName: "vCluster",
    id: 3289,
    listPrice: 0,
    name: "vCluster",
    shBundleProductIds: [],
    shIsBundle: false,
    type: "service",
  },
];

const segments: ProductSegment[] = [
  {
    label: "Segment 1",
    products: [PRODUCTS[1], PRODUCTS[2]],
  },
  {
    label: "Segment 2",
    products: [PRODUCTS[3]],
  },
];

export default {
  title: "Components/Block",
  component: Block,
  argTypes: {
    title: {
      control: {
        type: "text",
      },
    },
    segments: {
      control: {
        type: "object",
      },
    },
    products: {
      control: {
        type: "object",
      },
    },
  },
} as Meta;

const Template: Story<BlockProps> = (args) => (
  <div>
    <Block {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  title: "Default Block",
  segments: segments,
  products: [PRODUCTS[0]],
};

export const WithMultipleSegments = Template.bind({});

WithMultipleSegments.args = {
  title: "Block with Multiple Segments",
  segments: segments,
  products: [PRODUCTS[0], PRODUCTS[1]],
};
