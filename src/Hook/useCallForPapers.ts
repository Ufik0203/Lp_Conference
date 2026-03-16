import { useQuery } from "@tanstack/react-query";
import { getCallForPapers } from "@/services/callForPapers.service";
import { useArchive } from "@/context/ArchiveContext";

export function useCallForPapers() {
  const { archive } = useArchive();
  return useQuery({
    queryKey: ["call-for-papers", archive?.dateKey],
    queryFn: () => {
      if (archive) return archive.snapshot.callForPapers;
      return getCallForPapers();
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
