import { getConference } from "@/services/homeAdditional_B.service";
import type { ConferenceItem } from "@/types/homeAdditional_B";
import { useQuery } from "@tanstack/react-query";
import { useArchive } from "@/context/ArchiveContext";

export function useConference() {
  const { archive } = useArchive();
  // console.log("ARCHIVE HOME B:", archive?.snapshot?.homeAdditionalB);
  const query = useQuery<ConferenceItem[]>({
    queryKey: ["conference-images"],
    queryFn: getConference,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (archive?.snapshot?.homeAdditionalB) {
    const snap = archive.snapshot.homeAdditionalB;
    return {
      ...query,
      data: snap[0]?.conference ?? [],
    };
  }

  return query;
}
