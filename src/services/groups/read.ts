import {
  STORAGE_KEY,
  StorageEntity,
  StorageEntityType,
} from "../../models/entities/storage.entity";

export function extractStorage(): StorageEntityType {
  const storage = localStorage.getItem(STORAGE_KEY);

  if (!storage) {
    // Tasks not exists yet!
    initStorage();

    return {
      groups: [],
    };
  }

  try {
    const rawStorageAsArray: object = JSON.parse(storage);

    const storageObject: StorageEntityType =
      StorageEntity.validateSync(rawStorageAsArray);

    return storageObject;
  } catch {
    // Backup after reset it
    backupIt(String(storage));

    // Reset
    initStorage();
  }

  return {
    groups: [],
  };
}

function initStorage() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ groups: [] } as StorageEntityType)
  );
}

function backupIt(value: string) {
  localStorage.setItem(`${STORAGE_KEY}_${Date.now()}`, value);
}
