import { useQuery } from "@tanstack/react-query";
import { getRegistrationPriceTable } from "@/services/registrationPriceTable.service";
import type { RegistrationPriceTable } from "@/types/registrationPriceTable";
import { useArchive } from "@/context/ArchiveContext";

export function useRegistrationPrice() {
  const { archive } = useArchive();
  return useQuery<RegistrationPriceTable[]>({
    queryKey: ["registration-price", archive?.dateKey],
    queryFn: () => {
      if (archive) return archive.snapshot.registrationPrice;
      return getRegistrationPriceTable();
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
}
