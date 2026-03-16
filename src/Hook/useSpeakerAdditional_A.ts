import { useQuery } from "@tanstack/react-query";
import { getSpeakerAdditional_A } from "@/services/speakerAdditional_A.service";
import type { PdfExpressData } from "@/types/speakerAdditional_ATypes";
import { useArchive } from "@/context/ArchiveContext";

export function useSpeakerAdditionalA() {
  const { archive } = useArchive();
  return useQuery<PdfExpressData>({
    queryKey: ["speaker-additional-a", archive?.dateKey],
    queryFn: () => {
      if (archive) return archive.snapshot.pdfExpress;
      return getSpeakerAdditional_A();
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
