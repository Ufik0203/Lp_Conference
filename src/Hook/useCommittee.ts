import { useQuery } from "@tanstack/react-query";
import { getCommittee } from "@/services/committee.service";
import type { CommitteeInterface } from "@/types/committee";
import { useArchive } from "@/context/ArchiveContext";

export function useCommittee() {
  const { archive } = useArchive();
  return useQuery<CommitteeInterface>({
    queryKey: ["committee", archive?.dateKey],
    queryFn: () => {
      if (archive) return archive.snapshot.committee;
      return getCommittee();
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
