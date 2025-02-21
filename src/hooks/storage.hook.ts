import { useContext } from "preact/hooks";
import { StorageContext } from "../contexts/storage.context";

export function useStorage() {
  const value = useContext(StorageContext);

  return { value };
}
