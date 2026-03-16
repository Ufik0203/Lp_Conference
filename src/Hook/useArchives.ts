import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

type ArchiveItem = {
  year: number;
  dateKey: string;
};

const getArchives = async (): Promise<ArchiveItem[]> => {
  const { data } = await api.get("/archives");
  return data.data;
};

export function useArchives() {
  return useQuery({
    queryKey: ["archives"],
    queryFn: getArchives,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
