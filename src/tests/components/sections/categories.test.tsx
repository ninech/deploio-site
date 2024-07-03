import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, fireEvent, render, screen, within } from "@testing-library/react";

import { Categories } from "components/sections/categories";
import { useProducts } from "services/use-products";
import { useCartStore } from "store/cart-store";

jest.mock("store/cart-store");
jest.mock("services/use-products");
jest.mock("config", () => ({
  config: {
    VITE_APP_ENVIRONMENT: "testing",
    VITE_API_URL: "http://localhost:3000",
  },
}));

const queryClient = new QueryClient();

describe("Categories component", () => {
  beforeEach(() => {
    (useCartStore as unknown as jest.Mock).mockReturnValue({
      cartItems: [],
      addToCart: jest.fn(),
      changeQuantity: jest.fn(),
      removeFromCart: jest.fn(),
    });
  });

  it('should display "No categories to show" when there are no categories', () => {
    (useProducts as jest.Mock).mockReturnValue({
      data: [],
      error: undefined,
      loading: false,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Categories />
      </QueryClientProvider>
    );

    expect(screen.getByText("No categories to show")).toBeInTheDocument();
  });

  it("should display loading state", () => {
    (useProducts as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      loading: true,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Categories />
      </QueryClientProvider>
    );

    expect(screen.getByText("loading categories")).toBeInTheDocument();
  });

  it("should display error state", () => {
    (useProducts as jest.Mock).mockReturnValue({
      data: undefined,
      error: new Error("Failed to fetch"),
      loading: false,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Categories />
      </QueryClientProvider>
    );

    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(within(alert).getByText("Error")).toBeInTheDocument();
    expect(within(alert).getByText("Failed to fetch")).toBeInTheDocument();
  });

  it("should display categories when data is present", () => {
    const mockData = [
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
    ];

    (useProducts as jest.Mock).mockReturnValue({
      data: mockData,
      error: undefined,
      loading: false,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Categories />
      </QueryClientProvider>
    );

    expect(screen.getByText("Cloudserver")).toBeInTheDocument();
    expect(screen.getByText("Nine Kubernetes Engine")).toBeInTheDocument();
  });

  it("should increase and decrease product quantity in cart", () => {
    const mockData = [
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
    ];

    (useProducts as jest.Mock).mockReturnValue({
      data: mockData,
      error: undefined,
      loading: false,
    });

    const mockCartStore = {
      cartItems: [],
      addToCart: jest.fn(),
      changeQuantity: jest.fn(),
      removeFromCart: jest.fn(),
    };

    (useCartStore as unknown as jest.Mock).mockReturnValue(mockCartStore);

    render(
      <QueryClientProvider client={queryClient}>
        <Categories />
      </QueryClientProvider>
    );

    const quantityInput = screen.getByLabelText("quantity-input");
    expect(quantityInput).toHaveValue("0");

    const incrementButton = screen.getByLabelText("plus");
    act(() => {
      fireEvent.click(incrementButton);
    });
    expect(mockCartStore.addToCart).toHaveBeenCalledWith(mockData[0]);
    expect(mockCartStore.changeQuantity).not.toHaveBeenCalled();
  });
});
