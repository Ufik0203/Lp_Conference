import api from "@/lib/axios";
import type { ApiResponse, PartnerResponse } from "@/types/coOrganizedAndFinancial";

export async function GetCoOrganizedAndFinancial() {
  const res = await api.get<ApiResponse<PartnerResponse>>("/partners");
  return res.data.data;
}