export type PartnerSectionKey = "organizedBy" | "financialCoSponsoredBy";

export interface PartnerItem {
  _id: string;
  image_url: string;
  image_public_id: string;
  link_url?: string;
  order: number;
}

export interface PartnerResponse {
  organizedBy: PartnerItem[];
  financialCoSponsoredBy: PartnerItem[];
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}
