export const ButtonIcon = (props: React.ComponentProps<"button">) => {
  return (
    <button
      {...props}
      className="bg-nine-primary-100 disabled:bg-nine-primary-100 inline-flex h-[31px] w-[31px] items-center justify-center rounded-md border border-nine-secondary-border text-nine-primary-900 shadow-nine-card hover:bg-accent hover:text-accent-foreground active:border-gray-300 active:bg-gray-200 disabled:pointer-events-none disabled:border-nine-secondary-border disabled:text-nine-primary-900 disabled:opacity-50"
    />
  );
};
