import React, { PropsWithChildren, useEffect, useState } from "preact/compat";
import {
  STORAGE_EVENT_KEY,
  StorageEntityType,
} from "../models/entities/storage.entity";
import { extractStorage } from "../services/groups/read";

export const StorageContext = React.createContext<StorageEntityType>({
  groups: [],
});

export function StorageProvider({ children }: PropsWithChildren) {
  const [storage, setStorage] = useState<StorageEntityType>(extractStorage());

  useEffect(() => {
    // Load tasks first time and when it changes!

    const listener = () => {
      setStorage(extractStorage());
    };

    // Load it
    document.addEventListener(STORAGE_EVENT_KEY, listener);

    // Unload it
    return () => document.removeEventListener(STORAGE_EVENT_KEY, listener);
  }, []);

  return (
    <StorageContext.Provider value={storage}>
      {children}
    </StorageContext.Provider>
  );
}
