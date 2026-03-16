import { getImages } from "@/services/imageCarousel.service";
import type { ImagesCarousel } from "@/types/imagesCarousel";
import { useQuery } from "@tanstack/react-query";
import { useArchive } from "@/context/ArchiveContext";

export function useImages() {
  const { archive } = useArchive();

  const query = useQuery<ImagesCarousel[]>({
    queryKey: ["images"],
    queryFn: getImages,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });

  if (archive) {
    return {
      ...query,
      data: archive.snapshot.images,
    };
  }

  return query;
}
