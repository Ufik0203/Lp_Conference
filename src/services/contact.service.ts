import api from "@/lib/axios";
import type { ContactTypes, ApiResponseContact } from "@/types/contactTypes";

export async function getContact(): Promise<ContactTypes> {
  const res = await api.get<ApiResponseContact<ContactTypes>>("/contact");
  return res.data.data;
}
