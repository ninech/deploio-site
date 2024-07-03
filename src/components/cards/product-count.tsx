import { DotIcon } from "components/icons/DotIcon";

export const ProductCount = ({ amount }: { amount: number }) => {
  if (amount === 0) {
    return null;
  }

  return (
    <div className="flex justify-end rounded-xl border-t border-nine-gray-200 px-4 py-1">
      <div className="inline-flex items-center gap-1">
        <DotIcon />
        <span className="text-xs font-medium text-nine-tertiary-600">
          {amount} product{amount === 1 ? "" : "s"} selected
        </span>
      </div>
    </div>
  );
};
