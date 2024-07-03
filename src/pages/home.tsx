import { Categories } from "components/sections/categories";
import { ShoppingList } from "components/sections/shopping-list";
import { Container } from "components/ui/wrappers";

export const Home = () => {
  return (
    <Container>
      <div className="flex flex-col gap-5 md:p-5 lg:flex-row">
        <div
          className="flex flex-col gap-5 p-5 md:p-0 lg:w-4/12"
          aria-label="categories"
        >
          <Categories />
        </div>

        <div className="lg:w-8/12" aria-label="shopping-list">
          <ShoppingList />
        </div>
      </div>
    </Container>
  );
};
