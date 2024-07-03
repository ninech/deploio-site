import { useEffect, useState } from "react";

import { MinusIcon } from "components/icons/MinusIcon";
import { PlusIcon } from "components/icons/PlusIcon";
import { ButtonIcon } from "components/ui/button-icon";

// eslint-disable-next-line unicorn/numeric-separators-style
export const ProductHardMaxQuantity = 10000;

type QuantInputProps = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onChangeQuantity: (quantity: number) => void;
};

export const QuantInput = ({
  quantity,
  onChangeQuantity,
  onDecrement,
  onIncrement,
}: QuantInputProps) => {
  const [value, setValue] = useState(quantity.toString());

  const maximumQuantity = ProductHardMaxQuantity;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    const removeNonDigits = value.replaceAll(/\D/g, "");

    setValue(removeNonDigits);
  };

  const handleOnBlur = () => {
    if (value === "") {
      setValue(quantity.toString());
      return;
    }

    const numberValue = Number.parseInt(value, 10);

    if (value === quantity.toString()) {
      return;
    }

    if (numberValue > ProductHardMaxQuantity || numberValue < 0) {
      setValue(quantity.toString());
      onChangeQuantity(quantity);
    } else {
      setValue(Number.parseInt(value, 10).toString());
      onChangeQuantity(numberValue);
    }
  };

  useEffect(() => {
    setValue(quantity.toString());
  }, [quantity]);

  return (
    <div className="bg-nine-primary flex h-[48px] w-[118px] items-center justify-between gap-1 rounded-xl p-1">
      <ButtonIcon
        type="button"
        className="bg-nine-primary-100 h-6 w-6 rounded-md border border-nine-gray-200 text-nine-primary-900"
        disabled={quantity === 0}
        onClick={onDecrement}
        aria-label="minus"
      >
        <MinusIcon />
      </ButtonIcon>
      <input
        type="text"
        value={value}
        className="h-[31px] w-[36px] bg-nine-primary text-white rounded-md border border-transparent py-1 text-center font-medium text-nine-primary-900 outline-none hover:border-nine-gray-200 focus:border-nine-gray-700 "
        min={0}
        onChange={handleChange}
        onBlur={handleOnBlur}
        aria-label="quantity-input"
      />
      <ButtonIcon
        type="button"
        className="bg-nine-primary-100 h-6 w-6 rounded-md border border-nine-gray-200 text-nine-primary-900"
        onClick={onIncrement}
        aria-label="plus"
        disabled={quantity === maximumQuantity}
      >
        <PlusIcon />
      </ButtonIcon>
    </div>
  );
};
