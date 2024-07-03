import { act } from "@testing-library/react";

import type { Product } from "services/service-types";
import { useCartStore } from "store/cart-store";

const mockProduct: Product = {
  id: 1,
  name: "Test Product",
  descriptionSale: "Test product description",
  displayName: "Test Product",
  type: "test",
  currencyId: [1, "USD"],
  listPrice: 10,
  active: true,
  categId: [1, "Test Category"],
  shIsBundle: false,
  shBundleProductIds: [],
  categPath: ["Test Category"],
};

describe("useCartStore", () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires, unicorn/prefer-module
    const { storeResetFns } = require("zustand");
    act(() => {
      storeResetFns.forEach((resetFn: () => void) => {
        resetFn();
      });
    });
  });

  it("should add a product to the cart", () => {
    const store = useCartStore.getState();
    act(() => {
      store.addToCart(mockProduct);
    });
    const { cartItems } = useCartStore.getState();
    expect(cartItems.length).toBe(1);
    expect(cartItems[0].product).toEqual(mockProduct);
    expect(cartItems[0].quantity).toBe(1);
  });

  it("should increase the quantity of an existing product in the cart", () => {
    const store = useCartStore.getState();
    act(() => {
      store.addToCart(mockProduct);
      store.addToCart(mockProduct);
    });
    const { cartItems } = useCartStore.getState();
    expect(cartItems.length).toBe(1);
    expect(cartItems[0].product).toEqual(mockProduct);
    expect(cartItems[0].quantity).toBe(2);
  });

  it("should change the quantity of a product in the cart", () => {
    const store = useCartStore.getState();
    act(() => {
      store.addToCart(mockProduct);
      store.changeQuantity(mockProduct.id, 3);
    });
    const { cartItems } = useCartStore.getState();
    expect(cartItems.length).toBe(1);
    expect(cartItems[0].product).toEqual(mockProduct);
    expect(cartItems[0].quantity).toBe(3);
  });

  it("should remove a product from the cart", () => {
    const store = useCartStore.getState();
    act(() => {
      store.addToCart(mockProduct);
      store.removeFromCart(mockProduct.id);
    });
    const { cartItems } = useCartStore.getState();
    expect(cartItems.length).toBe(0);
  });

  it("should update cart item properties correctly", () => {
    const anotherProduct: Product = {
      id: 2,
      name: "Another Product",
      descriptionSale: "Another product description",
      displayName: "Another Product",
      type: "test",
      currencyId: [1, "USD"],
      listPrice: 20,
      active: true,
      categId: [1, "Test Category"],
      shIsBundle: false,
      shBundleProductIds: [],
      categPath: ["Test Category"],
    };

    const store = useCartStore.getState();
    act(() => {
      store.addToCart(mockProduct);
      store.addToCart(anotherProduct);
    });
    const { cartItems } = useCartStore.getState();
    expect(cartItems.length).toBe(2);
    expect(cartItems[0].product).toEqual(mockProduct);
    expect(cartItems[0].quantity).toBe(1);
    expect(cartItems[1].product).toEqual(anotherProduct);
    expect(cartItems[1].quantity).toBe(1);
  });
});
