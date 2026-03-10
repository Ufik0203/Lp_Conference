import api from "@/lib/axios";
import type { RegistrationPayment } from "@/types/registrationPaymentTable";

export async function getRegistrationPaymentTable(): Promise<RegistrationPayment> {
  const res = await api.get("/registration-payment");
  return res.data.data;
}
