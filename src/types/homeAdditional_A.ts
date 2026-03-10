export interface PreviousPublication {
  _id: string;
  title: string;
  url: string;
}

export interface PreviousPublicationResponse {
  message: string;
  data: PreviousPublication[] | PreviousPublication | null;
}