import { getTitleAndDates } from "@/services/titleAndDates.service";
import type { titleAndDates } from "@/types/titleAndDates";
import { useQuery } from "@tanstack/react-query";
import { useArchive } from "@/context/ArchiveContext";

export function useTitleAndDates() {
  const { archive } = useArchive();

  return useQuery<titleAndDates>({
    queryKey: ["title-and-dates", archive?.dateKey],
    queryFn: () => {
      if (archive) {
        return {
          title: archive.snapshot.home?.title,
          conferenceDate: archive.snapshot.importantDates?.conferenceDate,
        };
      }
      return getTitleAndDates();
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
