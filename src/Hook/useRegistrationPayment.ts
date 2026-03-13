import { useQuery } from "@tanstack/react-query";
import { getRegistrationPaymentTable } from "@/services/registrationPaymentTable.service";
import type { RegistrationPayment } from "@/types/registrationPaymentTable";

export function useRegistrationPayment() {
  return useQuery<RegistrationPayment>({
    queryKey: ["registration-payment"],
    queryFn: getRegistrationPaymentTable,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
}
