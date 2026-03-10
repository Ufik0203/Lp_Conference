export interface RegistrationPriceRow {
  _id: string;
  order: number;
  category: string;
  overseasPrice: number;
  localPrice: number;
}

export interface RegistrationPriceTable {
  _id: string;
  deadlineType: string;
  deadlineDate: string;
  rows: RegistrationPriceRow[];
}

export interface RegistrationPriceResponse {
  message: string;
  data: RegistrationPriceTable[];
}
