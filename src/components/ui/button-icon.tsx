export const ButtonIcon = (props: React.ComponentProps<"button">) => {
  return (
    <button
      {...props}
      className="bg-nine-primary disabled:bg-nine-primary-100 inline-flex h-[31px] w-[31px] items-center justify-center rounded-md border border-white text-nine-primary-900 shadow-nine-card hover:bg-primary active:border-gray-300 active:bg-primary disabled:pointer-events-none disabled:border-white disabled:text-nine-primary-900 disabled:opacity-50"
    />
  );
};
