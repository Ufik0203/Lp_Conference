import { useQuery } from "@tanstack/react-query";
import { getCallForPapers } from "@/services/callForPapers.service";

export function useCallForPapers() {
  return useQuery({
    queryKey: ["call-for-papers"],
    queryFn: getCallForPapers,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
