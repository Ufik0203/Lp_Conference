export interface callForPapersCard {
  _id: string;
  title: string;
  body: string[];
  bg_image_url: string;
  bg_image_public_id: string;
}

export interface callForPapers {
  _id: string;
  body: string;
  card: callForPapersCard[];
}

export interface apiResponse<T> {
  message: string;
  data: T;
}
