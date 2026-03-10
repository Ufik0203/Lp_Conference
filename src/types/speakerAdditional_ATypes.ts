export type PdfExpressSection = "ATA" | "SFC" | "UPE";

export interface PdfItem {
  _id: string;
  content: string;
  order: number;
}

export interface PdfExpressData {
  ATA: PdfItem[];
  SFC: PdfItem[];
  UPE: PdfItem[];
}
