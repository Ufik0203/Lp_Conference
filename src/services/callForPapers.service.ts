import api from "@/lib/axios";
import type { apiResponse, callForPapers } from "@/types/callForPapers";

export const getCallForPapers = async () => {
  const res = await api.get<apiResponse<callForPapers>>("/call-for-papers");
  return res.data.data;
};
