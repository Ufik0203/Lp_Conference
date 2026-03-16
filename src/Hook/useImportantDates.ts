import { useQuery } from "@tanstack/react-query";
import { getImportatntDates } from "@/services/importantDates.service";
import type { ImportantDates } from "@/types/importtantDates";
import { useArchive } from "@/context/ArchiveContext";

export function useImportantDates() {
  const { archive } = useArchive()

  return useQuery<ImportantDates>({
    queryKey: ["important-dates", archive?.dateKey],
    queryFn: () => {
      if (archive) return archive.snapshot.importantDates
      return getImportatntDates()
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })
}
