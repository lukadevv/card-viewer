import React, {
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "preact/compat";
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
  const broadcastChannel = useMemo(() => new BroadcastChannel("app"), []);

  useEffect(() => {
    // Load tasks first time and when it changes!

    const listener = () => {
      setStorage(extractStorage());
    };

    broadcastChannel.onmessage = () => {
      listener();
    };

    // Load it
    document.addEventListener(STORAGE_EVENT_KEY, listener);

    // Unload it
    return () => {
      document.removeEventListener(STORAGE_EVENT_KEY, listener);
      broadcastChannel.close();
    };
  }, []);

  return (
    <StorageContext.Provider value={storage}>
      {children}
    </StorageContext.Provider>
  );
}
