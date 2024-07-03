import { create } from "zustand";

import type { Product } from "services/service-types";

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CartStore = {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  changeQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cartItems: [],
  addToCart: (product: Product, quantity: number = 1) => {
    set((state) => {
      const existingProduct = state.cartItems.find(
        (cartItem) => cartItem.product.id === product.id
      );

      if (existingProduct) {
        return {
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.product.id === product.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        };
      }

      return {
        cartItems: [...state.cartItems, { product, quantity }],
      };
    });
  },
  changeQuantity: (productId: number, quantity: number) => {
    set((state) => ({
      cartItems: state.cartItems.map((cartItem) =>
        cartItem.product.id === productId ? { ...cartItem, quantity } : cartItem
      ),
    }));
  },
  removeFromCart: (productId: number) => {
    set((state) => ({
      cartItems: state.cartItems.filter(
        (cartItem) => cartItem.product.id !== productId
      ),
    }));
  },
}));
