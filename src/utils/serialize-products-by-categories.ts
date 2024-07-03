import type { Product, ProductsResponse } from "services/service-types";
import type { ProductSegment } from "types";

import { sortObjectBy } from "./sort-object-by";

export const serializeProductsByCategories = (
  data: ProductsResponse
): {
  label: string;
  products: Product[];
  segments: ProductSegment[];
}[] => {
  const categorizedProducts = categorizeProducts(data);
  const filteredCategories = filterCategories(categorizedProducts);
  return sortCategoriesAndSegments(filteredCategories);
};

interface BlockDict {
  [keys: string]: {
    label: string;
    segments: {
      [keys: string]: ProductSegment;
    };
    products: Product[];
  };
}

const categorizeProducts = (data: ProductsResponse) => {
  const blocksDict: BlockDict = {};

  data.forEach((product) => {
    const [, block, segment] = product.categId[1].split(" / ");

    if (block && segment) {
      addProductToSegment(blocksDict, block, segment, product);
    } else if (block) {
      addProductToBlock(blocksDict, block, product);
    }

    return {};
  });

  return blocksDict;
};

const addProductToBlock = (
  blocksDict: BlockDict,
  blockName: string,
  product: Product
) => {
  if (blocksDict[blockName]) {
    blocksDict[blockName].products.push(product);
  } else {
    blocksDict[blockName] = {
      label: blockName,
      segments: {},
      products: [product],
    };
  }
};

const addProductToSegment = (
  blocksDict: BlockDict,
  blockName: string,
  segmentName: string,
  product: Product
) => {
  if (!blocksDict[blockName]) {
    blocksDict[blockName] = {
      label: blockName,
      segments: {},
      products: [],
    };
  }

  const block = blocksDict[blockName];
  if (block.segments[segmentName]) {
    block.segments[segmentName].products.push(product);
  } else {
    block.segments[segmentName] = {
      label: segmentName,
      products: [product],
    };
  }
};

const filterCategories = (blocksDict: BlockDict) => {
  const whiteList = ["Deploio", "Object Storage", "On-Demand Services"];
  const newDict: BlockDict = {};

  Object.keys(blocksDict).forEach((blockName) => {
    if (whiteList.includes(blockName)) {
      newDict[blockName] = blocksDict[blockName];
    }
  });

  return newDict;
}

const sortCategoriesAndSegments = (blocksDict: BlockDict) => {
  return sortObjectBy(
    Object.values(blocksDict).map((block) => ({
      ...block,
      segments: sortObjectBy(
        Object.values(block.segments).map((segment) => ({
          ...segment,
          products: sortObjectBy(segment.products, "name"),
        })),
        "label"
      ),
    })),
    "label"
  );
};
