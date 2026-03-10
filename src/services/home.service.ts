import api from "@/lib/axios";
import type { HomeResponse } from "@/types/home";

export const getHome = async (): Promise<HomeResponse> => {
    const res = await api.get("/home");
    return res.data.data;
}