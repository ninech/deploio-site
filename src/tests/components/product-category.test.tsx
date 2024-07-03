import { fireEvent, render, screen } from "@testing-library/react";

import { ProductCategory } from "components/cards/product/product-category";
import type { Product } from "services/service-types";
import { useCartStore } from "store/cart-store";

jest.mock("store/cart-store");

const mockProduct: Product = {
  id: 101,
  name: "Product 1",
  displayName: "Product 1 display name",
  descriptionSale: "Product 1 description",
  type: "type1",
  currencyId: [1, "USD"],
  listPrice: 10,
  active: true,
  categId: [1, "Category 1"],
  shIsBundle: false,
  shBundleProductIds: [],
  categPath: ["Category 1"],
  helpText: "Help text for Product 1",
  bundleProducts: [],
};

type CartItem = {
  product: Product;
  quantity: number;
};

describe("ProductCategory component", () => {
  let mockCartStore: {
    cartItems: CartItem[];
    addToCart: jest.Mock;
    changeQuantity: jest.Mock;
    removeFromCart: jest.Mock;
  };

  beforeEach(() => {
    mockCartStore = {
      cartItems: [],
      addToCart: jest.fn(),
      changeQuantity: jest.fn(),
      removeFromCart: jest.fn(),
    };

    (useCartStore as unknown as jest.Mock).mockReturnValue(mockCartStore);
  });

  it("should render product information correctly", () => {
    render(<ProductCategory product={mockProduct} />);

    expect(screen.getByText("Product 1 display name")).toBeInTheDocument();
    expect(screen.getByText("Product 1 description")).toBeInTheDocument();
  });

  it("should call addToCart when increment button is clicked and quantity is 0", () => {
    render(<ProductCategory product={mockProduct} />);

    const incrementButton = screen.getByLabelText("plus");
    fireEvent.click(incrementButton);

    expect(mockCartStore.addToCart).toHaveBeenCalledWith(mockProduct);
  });

  it("should call changeQuantity when increment button is clicked and quantity is greater than 0", () => {
    mockCartStore.cartItems = [{ product: mockProduct, quantity: 1 }];

    render(<ProductCategory product={mockProduct} />);

    const incrementButton = screen.getByLabelText("plus");
    fireEvent.click(incrementButton);

    expect(mockCartStore.changeQuantity).toHaveBeenCalledWith(
      mockProduct.id,
      2
    );
  });

  it("should call removeFromCart when decrement button is clicked and quantity becomes 0", () => {
    mockCartStore.cartItems = [{ product: mockProduct, quantity: 1 }];

    render(<ProductCategory product={mockProduct} />);

    const decrementButton = screen.getByLabelText("minus");
    fireEvent.click(decrementButton);

    expect(mockCartStore.removeFromCart).toHaveBeenCalledWith(mockProduct.id);
  });

  it("should call changeQuantity when decrement button is clicked and quantity is greater than 1", () => {
    mockCartStore.cartItems = [{ product: mockProduct, quantity: 2 }];

    render(<ProductCategory product={mockProduct} />);

    const decrementButton = screen.getByLabelText("minus");
    fireEvent.click(decrementButton);

    expect(mockCartStore.changeQuantity).toHaveBeenCalledWith(
      mockProduct.id,
      1
    );
  });
});
