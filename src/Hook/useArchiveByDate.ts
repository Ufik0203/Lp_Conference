import { useQuery } from "@tanstack/react-query";
import { getArchive } from "@/services/archive.service";

export function useArchiveByDate(dateKey?: string) {
  return useQuery({
    queryKey: ["archive", dateKey],
    queryFn: () => getArchive(dateKey!),
    enabled: !!dateKey,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
