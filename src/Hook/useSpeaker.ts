import { useQuery } from "@tanstack/react-query";
import { getSpeakers } from "@/services/speakers.service";
import type { SpeakersType } from "@/types/speakers";

export function useSpeakers() {
  return useQuery<SpeakersType[]>({
    queryKey: ["speakers"],
    queryFn: getSpeakers,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
