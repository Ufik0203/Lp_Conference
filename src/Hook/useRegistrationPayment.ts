import { useQuery } from "@tanstack/react-query";
import { getRegistrationPaymentTable } from "@/services/registrationPaymentTable.service";
import type { RegistrationPayment } from "@/types/registrationPaymentTable";
import { useArchive } from "@/context/ArchiveContext";

export function useRegistrationPayment() {
  const { archive } = useArchive();
  return useQuery<RegistrationPayment>({
    queryKey: ["registration-payment", archive?.dateKey],
    queryFn: () => {
      if (archive) return archive.snapshot.registrationPayment;
      return getRegistrationPaymentTable();
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
}