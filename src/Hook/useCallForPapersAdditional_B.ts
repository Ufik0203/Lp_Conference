import { useQuery } from "@tanstack/react-query";
import { getCallForPaperAdditional_B } from "@/services/callForPaperAdditional_B.service";
import type { CallForPapersAdditionalBData } from "@/types/callForPaperAdditional_B";
import { useArchive } from "@/context/ArchiveContext";

export function useCallForPaperAdditionalB() {
  const { archive } = useArchive();
  const query = useQuery<CallForPapersAdditionalBData>({
    queryKey: ["call-for-paper-additional-b"],
    queryFn: getCallForPaperAdditional_B,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  if (archive?.snapshot?.callForPapersAdditionalB) {
    const snap = archive.snapshot.callForPapersAdditionalB;
    return {
      ...query,
      data: {
        CGAP: snap.CGAP_body ?? [],
        IPS: snap.IPS_body ?? [],
        VP: snap.VP_body ?? [],
      } as CallForPapersAdditionalBData,
    };
  }

  return query;
}
