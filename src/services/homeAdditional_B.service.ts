import api from "@/lib/axios";
import type { ConferenceItem } from "@/types/homeAdditional_B";

export async function getConference(): Promise<ConferenceItem[]> {
  const res = await api.get("/home/additional_b");
  return res.data.data;
}
