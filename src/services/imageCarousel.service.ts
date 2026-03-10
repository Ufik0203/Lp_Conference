import api from "@/lib/axios";

export const getImages = async () => {
  const res = await api.get("/images");
  return res.data.data;
};
