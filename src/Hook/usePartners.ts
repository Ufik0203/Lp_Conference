import { useQuery } from "@tanstack/react-query";
import { GetCoOrganizedAndFinancial } from "@/services/coOrganizedAndFinancial.service";
import type { PartnerResponse } from "@/types/coOrganizedAndFinancial";

export function usePartners() {
  return useQuery<PartnerResponse>({
    queryKey: ["partners"],
    queryFn: GetCoOrganizedAndFinancial,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
}
