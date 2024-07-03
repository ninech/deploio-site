import { serializeProductsByCategories } from "utils/serialize-products-by-categories";

import { PRODUCTS } from "./__fixtures__";

describe("serializeProductsByCategories", () => {
  test("should return an array of objects with label, products and segments", () => {
    const categories = serializeProductsByCategories(PRODUCTS);

    expect(categories).toEqual([
      {
        label: "Cloudserver",
        products: [
          {
            active: true,
            categId: [17, "All / Cloudserver"],
            categPath: ["All", "Cloudserver"],
            currencyId: [5, "CHF"],
            descriptionSale: "1GiB RAM, 1 vCPU",
            displayName: "Cloudserver C1",
            id: 3032,
            listPrice: 11,
            name: "Cloudserver C1",
            shBundleProductIds: [],
            shIsBundle: false,
            type: "service",
          },
          {
            active: true,
            categId: [17, "All / Cloudserver"],
            categPath: ["All", "Cloudserver"],
            currencyId: [5, "CHF"],
            descriptionSale: "2GiB RAM, 1 vCPU",
            displayName: "Cloudserver C2",
            id: 3033,
            listPrice: 22,
            name: "Cloudserver C2",
            shBundleProductIds: [],
            shIsBundle: false,
            type: "service",
          },
        ],
        segments: [],
      },
      {
        label: "Nine Kubernetes Engine",
        products: [],
        segments: [
          {
            label: "Services",
            products: [
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
            ],
          },
        ],
      },
    ]);
  });
});
