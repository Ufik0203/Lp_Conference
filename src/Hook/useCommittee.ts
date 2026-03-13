import { useQuery } from "@tanstack/react-query";
import { getCommittee } from "@/services/committee.service";
import type { CommitteeInterface } from "@/types/committee";

export function useCommittee() {
  return useQuery<CommitteeInterface>({
    queryKey: ["committee"],
    queryFn: getCommittee,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
