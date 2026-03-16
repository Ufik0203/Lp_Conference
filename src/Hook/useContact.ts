import { useQuery } from "@tanstack/react-query";
import { getContact } from "@/services/contact.service";
import type { ContactTypes } from "@/types/contactTypes";
import { useArchive } from "@/context/ArchiveContext";

export function useContact() {
  const { archive } = useArchive()

  return useQuery<ContactTypes>({
    queryKey: ["contact", archive?.dateKey],
    queryFn: () => {
      if (archive) return archive.snapshot.contact
      return getContact()
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })
}
