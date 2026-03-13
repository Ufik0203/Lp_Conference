import { useQuery } from "@tanstack/react-query";
import { getCallForPaperAdditional_B } from "@/services/callForPaperAdditional_B.service";
import type { CallForPapersAdditionalBData } from "@/types/callForPaperAdditional_B";

export function useCallForPaperAdditionalB() {
  return useQuery<CallForPapersAdditionalBData>({
    queryKey: ["call-for-paper-additional-b"],
    queryFn: getCallForPaperAdditional_B,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
