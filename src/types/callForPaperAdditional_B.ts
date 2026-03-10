export interface CallForPapersAdditionalBItem {
  id: string;
  title: string;
  body: string[];
}

export interface CallForPapersAdditionalBData {
  CGAP: CallForPapersAdditionalBItem[];
  IPS: CallForPapersAdditionalBItem[];
  VP: CallForPapersAdditionalBItem[];
}

export interface CallForPapersAdditionalBResponse {
  message: string;
  data: CallForPapersAdditionalBData;
}

export type SectionType = "CGAP" | "IPS" | "VP";
