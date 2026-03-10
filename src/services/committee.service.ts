import api from "@/lib/axios";
import type { CommitteeInterface } from "@/types/committee";

export async function getCommittee(): Promise<CommitteeInterface> {
    const res = await api.get("/committee");
    return res.data.data;
}