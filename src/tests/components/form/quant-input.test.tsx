import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { QuantInput, ProductHardMaxQuantity } from "components/forms/quant-input";

describe("QuantInput component", () => {
  it("should render with initial quantity and allow incrementing", async () => {
    const onIncrement = jest.fn();
    const onDecrement = jest.fn();
    const onChangeQuantity = jest.fn();

    render(
      <QuantInput
        quantity={1}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onChangeQuantity={onChangeQuantity}
      />
    );

    const incrementButton = screen.getByRole("button", { name: /plus/i });
    const decrementButton = screen.getByRole("button", { name: /minus/i });
    const inputField = screen.getByRole("textbox");

    expect(inputField).toHaveValue("1");

    await userEvent.click(incrementButton);
    expect(onIncrement).toHaveBeenCalled();

    await userEvent.click(decrementButton);
    expect(onDecrement).toHaveBeenCalled();
  });

  it("should not decrement below zero and should restore to initial value on invalid input", async () => {
    const onIncrement = jest.fn();
    const onDecrement = jest.fn();
    const onChangeQuantity = jest.fn();

    render(
      <QuantInput
        quantity={1}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onChangeQuantity={onChangeQuantity}
      />
    );

    const decrementButton = screen.getByRole("button", { name: /minus/i });
    const inputField = screen.getByRole("textbox");

    await act(async () => {
      await userEvent.click(decrementButton);
    });

    expect(onDecrement).toHaveBeenCalled();

    await act(async () => {
      await userEvent.clear(inputField);
      await userEvent.type(inputField, "abc");
      await userEvent.tab();
    });

    expect(inputField).toHaveValue("1");

    await act(async () => {
      await userEvent.clear(inputField);
      await userEvent.type(inputField, "-1");
      await userEvent.tab();
    });

    expect(inputField).toHaveValue("1");
    expect(onChangeQuantity).toHaveBeenCalledTimes(0);
  });

  it("should update quantity on valid input and trigger onChangeQuantity", async () => {
    const onIncrement = jest.fn();
    const onDecrement = jest.fn();
    const onChangeQuantity = jest.fn();

    render(
      <QuantInput
        quantity={1}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onChangeQuantity={onChangeQuantity}
      />
    );

    const inputField = screen.getByRole("textbox");

    await act(async () => {
      await userEvent.clear(inputField);
      await userEvent.type(inputField, "5");
      await userEvent.tab();
    });

    expect(inputField).toHaveValue("5");
    expect(onChangeQuantity).toHaveBeenCalledWith(5);
  });

  it("should not update quantity on input greater than ProductHardMaxQuantity", async () => {
    const onIncrement = jest.fn();
    const onDecrement = jest.fn();
    const onChangeQuantity = jest.fn();

    render(
      <QuantInput
        quantity={1}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onChangeQuantity={onChangeQuantity}
      />
    );

    const inputField = screen.getByRole("textbox");

    const testValue = ProductHardMaxQuantity+1;

    await act(async () => {
      await userEvent.clear(inputField);
      await userEvent.type(inputField, testValue.toString());
      await userEvent.tab();
    });

    expect(inputField).toHaveValue("1");
    expect(onChangeQuantity).toHaveBeenCalledTimes(1);
    expect(onChangeQuantity).toHaveBeenCalledWith(1);
  });

  it("should disabled minus button at quantity 0", () => {
    const onIncrement = jest.fn();
    const onDecrement = jest.fn();
    const onChangeQuantity = jest.fn();

    render(
      <QuantInput
        quantity={0}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onChangeQuantity={onChangeQuantity}
      />
    );

    const decrementButton = screen.getByRole("button", { name: /minus/i });

    expect(decrementButton).toBeDisabled();
  });

  it("should disable increment button at quantity ProductHardMaxQuantity", () => {
    const onIncrement = jest.fn();
    const onDecrement = jest.fn();
    const onChangeQuantity = jest.fn();

    render(
      <QuantInput
        quantity={ProductHardMaxQuantity}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onChangeQuantity={onChangeQuantity}
      />
    );

    const incrementButton = screen.getByRole("button", { name: /plus/i });

    expect(incrementButton).toBeDisabled();
  });

  describe("should back to original number if number invalid with", () => {
    it("empty string", async () => {
      const onIncrement = jest.fn();
      const onDecrement = jest.fn();
      const onChangeQuantity = jest.fn();

      render(
        <QuantInput
          quantity={9}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          onChangeQuantity={onChangeQuantity}
        />
      );

      const inputField = screen.getByRole("textbox");

      await act(async () => {
        await userEvent.clear(inputField);
        await userEvent.tab();
      });

      expect(inputField).toHaveValue("9");
      expect(onChangeQuantity).toHaveBeenCalledTimes(0);
    });

    it("000", async () => {
      const onIncrement = jest.fn();
      const onDecrement = jest.fn();
      const onChangeQuantity = jest.fn();

      render(
        <QuantInput
          quantity={0}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          onChangeQuantity={onChangeQuantity}
        />
      );

      const inputField = screen.getByRole("textbox");

      await act(async () => {
        await userEvent.clear(inputField);
        await userEvent.type(inputField, "000");
        await userEvent.tab();
      });

      expect(inputField).toHaveValue("0");
      expect(onChangeQuantity).toHaveBeenCalledTimes(1);
    });
  });
});
