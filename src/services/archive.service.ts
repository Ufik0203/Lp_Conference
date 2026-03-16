import api from "@/lib/axios";

export const getArchive = async (dateKey: string) => {
  const { data } = await api.get(`/archives/${dateKey}`);
  return data.data;
};
