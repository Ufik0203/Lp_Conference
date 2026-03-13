import { useQuery } from "@tanstack/react-query";
import { getContact } from "@/services/contact.service";
import type { ContactTypes } from "@/types/contactTypes";

export function useContact() {
  return useQuery<ContactTypes>({
    queryKey: ["contact"],
    queryFn: getContact,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
