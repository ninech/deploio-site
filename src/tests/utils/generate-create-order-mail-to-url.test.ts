import {
  generateCreateOrderMailToUrl,
  generatedEmailBody,
  generatedProductList,
} from "utils/generate-create-order-mail-to-url";

import { CART_ITEMS } from "./__fixtures__";

describe("generateCreateOrderMailToUrl", () => {
  it("should return a mailto url with the correct subject and body", () => {
    const totalPriceFormatted = "500.00 CHF";

    expect(generateCreateOrderMailToUrl(CART_ITEMS, totalPriceFormatted)).toBe(
      `mailto:support@nine.ch?subject=Customer%20Order%20Enquiry&body=Dear%20Nine%2C%0A%0AWe%20would%20like%20to%20order%20the%20following%20services%2C%20which%20were%20configured%20via%20your%20pricing%20calculator%3A%0A%0AProduct%201%20-%20x1%20-%20CHF%20100.00%0AProduct%202%20-%20x2%20-%20CHF%20200.00%0A%0ATotal%20500.00%20CHF`
    );
  });

  it("should return the correct email body", () => {
    const totalPriceFormatted = "CHF 500.00";

    expect(generatedEmailBody(CART_ITEMS, totalPriceFormatted)).toBe(
      `Dear Nine,\n\nWe would like to order the following services, which were configured via your pricing calculator:\n\nProduct 1 - x1 - CHF 100.00\nProduct 2 - x2 - CHF 200.00\n\nTotal CHF 500.00`
    );
  });

  it("should return the correct product list", () => {
    expect(generatedProductList(CART_ITEMS)).toBe(
      `Product 1 - x1 - CHF 100.00\nProduct 2 - x2 - CHF 200.00`
    );
  });
});
