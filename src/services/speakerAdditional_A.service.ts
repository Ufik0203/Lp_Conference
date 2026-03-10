import api from "@/lib/axios";
import type { PdfExpressData } from "@/types/speakerAdditional_ATypes";

export async function getSpeakerAdditional_A(): Promise<PdfExpressData> {
  const res = await api.get("/pdf-express");
  return res.data.data;
}