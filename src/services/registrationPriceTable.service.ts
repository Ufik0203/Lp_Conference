import api from "@/lib/axios";
import type { RegistrationPriceTable } from "@/types/registrationPriceTable";

export async function getRegistrationPriceTable(): Promise<
  RegistrationPriceTable[]
> {
  const res = await api.get("/registration-price");
  return res.data.data;
}
