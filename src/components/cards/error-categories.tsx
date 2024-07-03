type ErrorCategoriesProps = {
  error?: Error;
};

export const ErrorCategories = ({ error }: ErrorCategoriesProps) => {
  if (!error) return null;

  return (
    <div
      className="relative rounded border border-red-200 bg-red-100 px-4 py-3 text-red-700 shadow-nine-card"
      role="alert"
    >
      <h2>Error</h2>
      <p>{error?.message ?? "Something went wrong"}</p>
    </div>
  );
};
