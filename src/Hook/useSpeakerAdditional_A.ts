import { useQuery } from "@tanstack/react-query";
import { getSpeakerAdditional_A } from "@/services/speakerAdditional_A.service";
import type { PdfExpressData } from "@/types/speakerAdditional_ATypes";

export function useSpeakerAdditionalA() {
  return useQuery<PdfExpressData>({
    queryKey: ["speaker-additional-a"],
    queryFn: getSpeakerAdditional_A,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
