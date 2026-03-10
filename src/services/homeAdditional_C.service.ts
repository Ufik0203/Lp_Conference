import api from "@/lib/axios";
import type { AboutEventResponse } from "@/types/homeAdditional_C";

export const getHomeAdditional_C = async () => {
  const res = await api.get<AboutEventResponse>("/home/additional_c");
  return res.data.data;
};
