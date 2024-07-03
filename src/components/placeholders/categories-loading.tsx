import clsx from "clsx";

export const CategoriesLoading = () => {
  return (
    <>
      <Items className="w-6/12" />
      <Items className="w-3/12" />
      <Items className="w-10/12" />
      <Items className="w-5/12" />
      <Items className="w-7/12" />
      <span className="sr-only">loading categories</span>
    </>
  );
};

const Items = ({ className }: { className?: string }) => (
  <div className="flex h-[58px] animate-pulse flex-wrap items-center justify-between rounded-xl border border-gray-100 bg-white pl-4 pr-6 shadow-nine-card">
    <div className={clsx("h-[1.3rem] w-3/12 rounded bg-gray-200", className)} />
    <div className="h-[16px] w-[16px] rounded bg-gray-200" />
  </div>
);
