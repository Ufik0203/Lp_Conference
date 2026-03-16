import { useQuery } from "@tanstack/react-query";
import { getSpeakers } from "@/services/speakers.service";
import type { SpeakersType } from "@/types/speakers";
import { useArchive } from "@/context/ArchiveContext";

export function useSpeakers() {
  const { archive } = useArchive();
  return useQuery<SpeakersType[]>({
    queryKey: ["speakers", archive?.dateKey],
    queryFn: () => {
      if (archive) return archive.snapshot.speakers;
      return getSpeakers();
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
