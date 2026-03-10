import api from "@/lib/axios";
import type { titleAndDates } from "@/types/titleAndDates";

export async function getTitleAndDates(): Promise<titleAndDates> {
  const res = await api.get("/important-dates");
  return res.data.data;
}
