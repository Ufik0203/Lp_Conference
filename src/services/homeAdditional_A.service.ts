import api from "@/lib/axios";
import type { PreviousPublication } from "@/types/homeAdditional_A";

export const getHomeAdditional_A = async (): Promise<PreviousPublication[]> => {
  const res = await api.get("/home/additional_a");
  return res.data.data;
};
