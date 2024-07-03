import type { jsPDF } from "jspdf";
import "jspdf-autotable";

export interface CartItem {
  name: string;
  quantity: number;
  price: number | string;
}

const totalPagesExp = "{total_pages_count_string}";

export const addLogo = (document: jsPDF, logoSource: string) => {
  const logo = new Image();
  logo.src = logoSource;
  document.addImage(logo, "PNG", 15, 10, 104 / 2.8, 35 / 2.8);
};

export const addProductTable = (
  document: jsPDF,
  cart: CartItem[],
  addLogo: (document: jsPDF, logoSource: string) => void
) => {
  const data = cart.map((item) => [item.name, item.quantity, item.price]);

  document.autoTable({
    head: [
      [
        { dataKey: "product", content: "Product" },
        { dataKey: "quantity", content: "Quantity" },
        {
          dataKey: "price",
          content: "Price",
          styles: {
            halign: "right",
          },
        },
      ],
    ],
    columns: [
      { dataKey: "product" },
      { dataKey: "quantity" },
      {
        dataKey: "price",
        styles: {
          halign: "right",
        },
      },
    ],
    body: data,
    startY: 30,
    margin: { top: 30 },
    headStyles: { price: { halign: "right" } },
    columnStyles: { price: { halign: "right" } },
    willDrawPage: addLogo,
    didDrawPage: function (data) {
      let footerText = `Page ${document.internal.getNumberOfPages()}`;

      if (typeof document.putTotalPages === "function") {
        footerText += ` of ${totalPagesExp}`;
      }
      document.setFontSize(10);

      const pageSize = document.internal.pageSize;
      const pageHeight = pageSize.height ?? pageSize.getHeight();
      document.text(footerText, data.settings.margin.left, pageHeight - 10);
    },
  });
};

export const addFooter = (document: jsPDF) => {
  if (typeof document.putTotalPages === "function") {
    document.putTotalPages(totalPagesExp);
  }
};

export const addTotal = (document: jsPDF, total: string) => {
  const totalText = `Total: ${total} /mo`;

  document.autoTable({
    body: [{ total: totalText }],
    columnStyles: { total: { halign: "right", fontSize: 18 } },
    theme: "plain",
  });

  const bottom = `To order please contact support@nine.ch`;

  document.autoTable({
    body: [{ bottom }],
    columnStyles: { bottom: { halign: "center", fontSize: 10 } },
    theme: "plain",
  });
};
