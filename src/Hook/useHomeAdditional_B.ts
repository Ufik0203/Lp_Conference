import { getConference } from "@/services/homeAdditional_B.service";
import type { ConferenceItem } from "@/types/homeAdditional_B";
import { useQuery } from "@tanstack/react-query";

export function useConference() {
  return useQuery<ConferenceItem[]>({
    queryKey: ["conference-images"],
    queryFn: getConference,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
