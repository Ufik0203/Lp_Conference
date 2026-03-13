import { useQuery } from "@tanstack/react-query";
import { getHomeAdditional_A } from "@/services/homeAdditional_A.service";
import type { PreviousPublication } from "@/types/homeAdditional_A";

export function useHomeAdditionalA() {
  return useQuery<PreviousPublication[]>({
    queryKey: ["home-additional-a"],
    queryFn: getHomeAdditional_A,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
