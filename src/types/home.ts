export interface PdfPage {
  _id: string;
  title: string;
  body: string;
}

export interface SectionWithImage {
  title: string;
  body: string;
  image_url: string;
}

export interface UsingPdf {
  image_url: string;
  pages: PdfPage[];
}

export interface HomeResponse {
  _id: string;
  submission: SectionWithImage;
  presentation_slide: SectionWithImage;
  using_pdf: UsingPdf;
}
