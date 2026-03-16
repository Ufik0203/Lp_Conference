import { useQuery } from "@tanstack/react-query";
import { getHomeAdditional_A } from "@/services/homeAdditional_A.service";
import type { PreviousPublication } from "@/types/homeAdditional_A";
import { useArchive } from "@/context/ArchiveContext";

export function useHomeAdditionalA() {
  const { archive } = useArchive();

  return useQuery<PreviousPublication[]>({
    queryKey: ["home-additional-a", archive?.dateKey],
    queryFn: () => {
      if (archive) return archive.snapshot.homeAdditionalA;
      return getHomeAdditional_A();
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
