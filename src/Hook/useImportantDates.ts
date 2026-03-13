import { useQuery } from "@tanstack/react-query";
import { getImportatntDates } from "@/services/importantDates.service";
import type { ImportantDates } from "@/types/importtantDates";

export function useImportantDates() {
  return useQuery<ImportantDates>({
    queryKey: ["important-dates"],
    queryFn: getImportatntDates,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
