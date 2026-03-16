import { useArchive } from "@/context/ArchiveContext";
import { GetCoOrganizedAndFinancial } from "@/services/coOrganizedAndFinancial.service";
import type { PartnerResponse } from "@/types/coOrganizedAndFinancial";
import { useQuery } from "@tanstack/react-query";

export function usePartners() {
  const { archive } = useArchive()
  return useQuery<PartnerResponse>({
    queryKey: ["partners", archive?.dateKey],
    queryFn: () => {
      if (archive) return archive.snapshot.partners
      return GetCoOrganizedAndFinancial()
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false
  })
}
