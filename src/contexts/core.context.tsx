import { PropsWithChildren } from "preact/compat";
import { StorageProvider } from "./storage.context";

export function CoreProvider({ children }: PropsWithChildren) {
  return <StorageProvider>{children}</StorageProvider>;
}
