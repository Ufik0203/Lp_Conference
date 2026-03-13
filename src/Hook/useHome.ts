import { getHome } from "@/services/home.service";
import type { HomeResponse } from "@/types/home";
import { useQuery } from "@tanstack/react-query";

export function useHome() {
  return useQuery<HomeResponse>({
    queryKey: ["home"],
    queryFn: getHome,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
