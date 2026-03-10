import api from "@/lib/axios";
import type { SpeakersType } from "@/types/speakers";

export async function getSpeakers(): Promise<SpeakersType[]> {
  const res = await api.get("/speakers");
  return res.data.data;
}
