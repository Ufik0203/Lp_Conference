import api from "@/lib/axios";
import type { ImportantDates } from "@/types/importtantDates";

export async function getImportatntDates(): Promise<ImportantDates> {
  const res = await api.get("/important-dates");
  return res.data.data;
}
