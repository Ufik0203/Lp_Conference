import { useQuery } from "@tanstack/react-query";
import { getRegistrationPriceTable } from "@/services/registrationPriceTable.service";
import type { RegistrationPriceTable } from "@/types/registrationPriceTable";

export function useRegistrationPrice() {
  return useQuery<RegistrationPriceTable[]>({
    queryKey: ["registration-price"],
    queryFn: getRegistrationPriceTable,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
}
