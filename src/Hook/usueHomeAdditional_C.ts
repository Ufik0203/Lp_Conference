import { useQuery } from "@tanstack/react-query";
import { getHomeAdditional_C } from "@/services/homeAdditional_C.service";
import { useArchive } from "@/context/ArchiveContext";

export function useHomeAdditionalC() {
  const { archive } = useArchive();
  return useQuery({
    queryKey: ["home-additional-c", archive?.dateKey],
    queryFn: () => {
      if (archive) return archive.snapshot.homeAdditionalC;
      return getHomeAdditional_C();
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
