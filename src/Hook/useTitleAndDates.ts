import { getTitleAndDates } from "@/services/titleAndDates.service";
import type { titleAndDates } from "@/types/titleAndDates";
import { useQuery } from "@tanstack/react-query";

export function useTitleAndDates() {
  return useQuery<titleAndDates>({
    queryKey: ["title-and-dates"],
    queryFn: getTitleAndDates,
    staleTime: 1000 * 60 * 5,
  });
}
