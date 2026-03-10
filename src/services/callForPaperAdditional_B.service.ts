import api from "@/lib/axios";
import type { CallForPapersAdditionalBData } from "@/types/callForPaperAdditional_B";

export async function getCallForPaperAdditional_B(): Promise<CallForPapersAdditionalBData> {
  const res = await api.get("/call-for-papers/additional_b");
  return res.data.data;
}
