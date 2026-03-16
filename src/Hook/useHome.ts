import { getHome } from "@/services/home.service";
import type { HomeResponse } from "@/types/home";
import { useQuery } from "@tanstack/react-query";
import { useArchive } from "@/context/ArchiveContext";

export function useHome() {
  const { archive } = useArchive();
  return useQuery<HomeResponse>({
    queryKey: ["home", archive?.dateKey],
    queryFn: () => {
      if (archive) return archive.snapshot.home;
      return getHome();
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
