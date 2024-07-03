import { Block } from "components/cards/block";
import { ErrorCategories } from "components/cards/error-categories";
import { CategoriesLoading } from "components/placeholders/categories-loading";
import { useProducts } from "services/use-products";
import { serializeProductsByCategories } from "utils/serialize-products-by-categories";

export const Categories = () => {
  const { data, error, loading } = useProducts();

  const categories = data ? serializeProductsByCategories(data) : [];

  if (loading) return <CategoriesLoading />;

  if (error) return <ErrorCategories error={error} />;

  if (!data || categories.length === 0)
    return (
      <div className="rounded-lg border-nine-gray-200 bg-nine-tertiary p-4 text-center font-medium text-nine-primary-900">
        No categories to show
      </div>
    );

  return (
    <>
      {categories.map((category) => (
        <Block
          key={category.label}
          title={category.label}
          segments={category.segments}
          products={category.products}
        />
      ))}
    </>
  );
};
