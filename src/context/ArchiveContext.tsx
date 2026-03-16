import { createContext, useContext, useState } from "react";

type ArchiveType = any | null;

type ArchiveContextType = {
  archive: ArchiveType;
  setArchive: (data: ArchiveType) => void;
};

const ArchiveContext = createContext<ArchiveContextType>({
  archive: null,
  setArchive: () => {},
});

export const ArchiveProvider = ({ children }: any) => {
  const [archive, setArchive] = useState<ArchiveType>(null);
  return (
    <ArchiveContext.Provider value={{ archive, setArchive }}>
      {children}
    </ArchiveContext.Provider>
  );
};

export const useArchive = () => useContext(ArchiveContext);
