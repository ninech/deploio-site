import { render, screen } from "@testing-library/react";

import { ShoppingList } from "components/sections/shopping-list";
import { useCartStore } from "store/cart-store";

jest.mock("store/cart-store", () => ({
  useCartStore: jest.fn(),
}));

jest.mock("features/shopping-list-pdf/shopping-list-pdf", () => ({
  downloadShoppingListPDF: jest.fn(),
}));

describe("ShoppingList component", () => {
  it('should display "No items selected yet" when no items are in the cart', () => {
    (useCartStore as unknown as jest.Mock).mockReturnValue({ cartItems: [] });

    render(<ShoppingList />);

    expect(screen.getByText(/no items selected yet/i)).toBeInTheDocument();
  });

  it("should display the total price and item count when cart has items", () => {
    const mockCartItems = [
      {
        product: {
          id: "1",
          listPrice: 100,
          displayName: "Product 1",
          currencyId: [1, "chf"],
          descriptionSale: "Description 1",
        },
        quantity: 1,
      },
      {
        product: {
          id: "2",
          listPrice: 200,
          displayName: "Product 2",
          currencyId: [1, "chf"],
          descriptionSale: "Description 2",
        },
        quantity: 2,
      },
    ];

    (useCartStore as unknown as jest.Mock).mockReturnValue({
      cartItems: mockCartItems,
    });

    render(<ShoppingList />);

    expect(screen.getByText(/chf 100.00/i)).toBeInTheDocument();
    expect(screen.getByText(/2 items?/i)).toBeInTheDocument();
  });

  it("should disable download and create order buttons when cart is empty", () => {
    (useCartStore as unknown as jest.Mock).mockReturnValue({ cartItems: [] });

    render(<ShoppingList />);

    const downloadButtons = screen.getAllByRole("button", {
      name: /download/i,
    });
    const createOrderButtons = screen.getAllByRole("button", {
      name: /create order/i,
    });

    downloadButtons.forEach((button) => {
      expect(button).toBeDisabled();
    });

    createOrderButtons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });

  it("should enable download and create order buttons when cart has items", () => {
    (useCartStore as unknown as jest.Mock).mockReturnValue({
      cartItems: [
        {
          product: {
            id: "1",
            listPrice: 100,
            displayName: "Product 1",
            currencyId: ["USD"],
            descriptionSale: "Description 1",
          },
          quantity: 1,
        },
      ],
    });

    render(<ShoppingList />);

    const downloadButtons = screen.getAllByRole("button", {
      name: /download/i,
    });
    const createOrderButtons = screen.getAllByRole("button", {
      name: /create order/i,
    });

    downloadButtons.forEach((button) => {
      expect(button).toBeEnabled();
    });

    createOrderButtons.forEach((button) => {
      expect(button).toBeEnabled();
    });
  });
});
