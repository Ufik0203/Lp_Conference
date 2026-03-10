export interface AboutEvent {
  _id: string;
  image_url: string;
  image_public_id: string;
  body: string;
}

export interface AboutEventResponse {
  message: string;
  data: AboutEvent | null;
}