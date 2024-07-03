import { jsPDF } from "jspdf";

import {
  type CartItem,
  addFooter,
  addLogo,
  addProductTable,
  addTotal,
} from "./pdf-section";

const LOGO = "./logo-pdf.png";

type GenerateShoppingListPDFProps = {
  cart: CartItem[];
  total: string;
};

export function generateShoppingListPDF({
  cart,
  total,
}: GenerateShoppingListPDFProps) {
  jsPDF.autoTableSetDefaults({
    headStyles: {
      fillColor: 0,
    },
  });

  const document = new jsPDF();

  addProductTable(document, cart, () => {
    addLogo(document, LOGO);
  });

  addTotal(document, total);
  addFooter(document);

  return document.output("datauristring");
}

export function downloadShoppingListPDF({
  cart,
  total,
}: GenerateShoppingListPDFProps) {
  const suffixDateTime = [
    new Date().toLocaleDateString(),
    new Date().toLocaleTimeString(),
  ].join(" ");
  const filename = `shopping-list-${suffixDateTime}.pdf`;
  const dataURI = generateShoppingListPDF({ cart, total });

  const link = document.createElement("a");
  link.href = dataURI;
  link.download = filename;
  link.click();
}
