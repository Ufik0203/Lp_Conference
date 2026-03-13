import { useQuery } from "@tanstack/react-query";
import { getHomeAdditional_C } from "@/services/homeAdditional_C.service";

export function useHomeAdditionalC() {
  return useQuery({
    queryKey: ["home-additional-c"],
    queryFn: getHomeAdditional_C,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
