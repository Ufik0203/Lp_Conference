import { getImages } from "@/services/imageCarousel.service";
import type { ImagesCarousel } from "@/types/imagesCarousel";
import { useQuery } from "@tanstack/react-query";

export function useImages() {
  return useQuery<ImagesCarousel[]>({
    queryKey: ["images"],
    queryFn: getImages,
    staleTime: 1000 * 60 * 60, // 1 jam
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
