/* eslint-disable @typescript-eslint/no-explicit-any */
import "jspdf";
import "jspdf-autotable";

declare module "jspdf" {
  interface Styles {
    fillColor?: number;
    halign?: "right" | "center";
    fontSize?: number;
  }

  interface DataPage {
    settings: {
      margin: {
        left: number;
      };
    };
  }

  interface AutoTableOptions {
    head?: (string | { dataKey: string; content: string; styles?: Styles })[][];
    body: ((string | number)[] | Record<string, string>)[];
    startY?: number;
    margin?: { top: number; left?: number; right?: number; bottom?: number };
    columnStyles?: Record<string, Styles>;
    headStyles?: Record<string, Styles> | Styles;
    didDrawPage?: (data: DataPage) => void;
    theme?: string;
    columns?: { dataKey: string; styles?: Styles }[];
    // eslint-disable-next-line no-use-before-define
    willDrawPage?: (document: jsPDF, logoSource: string) => void;
  }

  interface jsPDFInternal {
    events: any;
    scaleFactor: number;
    pageSize: {
      width: number;
      height: number;
      getWidth: () => number;
      getHeight: () => number;
    };
    pages: any[];
    getNumberOfPages: () => number;
  }

  class jsPDF {
    public internal: jsPDFInternal;
    public autoTable(options: AutoTableOptions): void;
    public autoTableSetDefaults(options: AutoTableOptions): void;
    public output(type: string): string;
    public putTotalPages(exp: string): void;
    public setFontSize(size: number): void;
    public text(
      text: string | string[],
      x: number,
      y: number,
      options?: TextOptionsLight,
      transform?: number
    ): jsPDF;
    public addImage(
      imageData: string | HTMLImageElement,
      format: string,
      x: number,
      y: number,
      w: number,
      h: number
    );
  }

  namespace jsPDF {
    function autoTableSetDefaults(options: Partial<AutoTableOptions>): void;
  }
}
