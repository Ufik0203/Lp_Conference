export interface ContactTypes {
  _id?: string;
  image_url: string;
  image_public_id: string;
  email: string;
  noWhatsApp: string;
  location: string;
  venue: string;
  urlGmap: string;
}

export interface ApiResponseContact<T> {
  message: string;
  data: T;
}
