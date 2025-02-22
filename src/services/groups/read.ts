import { CARDS } from "../../models/cards";
import {
  STORAGE_EVENT_KEY,
  STORAGE_KEY,
  StorageEntity,
  StorageEntityType,
} from "../../models/entities/storage.entity";
import { generateRandomID } from "../../utils/uid";

export function extractStorage(): StorageEntityType {
  const storage = localStorage.getItem(STORAGE_KEY);

  if (!storage) {
    // Tasks not exists yet

    return initStorage();
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
    return initStorage();
  }
}

function initStorage() {
  const dragon = CARDS[199],
    thunder = CARDS[210],
    magic = CARDS[314],
    umi = CARDS[333],
    trap = CARDS[685],
    jar = CARDS[328],
    mm = CARDS[656];

  const value: StorageEntityType = {
    groups: [
      {
        id: generateRandomID(),
        name: "Default group",
        cards: [
          {
            ...dragon,
            count: 0,
          },
          {
            ...thunder,
            count: 0,
          },
          {
            ...magic,
            count: 0,
          },
          {
            ...umi,
            count: 0,
          },
          {
            ...trap,
            count: 0,
          },
          {
            ...jar,
            count: 0,
          },
          {
            ...mm,
            count: 0,
          },
        ],
        display: {
          columns: 3,
          background: "#000000",
          counterBackground: "#ffffff",
          counterColor: "#000000",
        },
      },
    ],
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));

  // Fire event for listeners, to re-hydrate components
  document.dispatchEvent(new Event(STORAGE_EVENT_KEY));

  return value;
}

function backupIt(value: string) {
  localStorage.setItem(`${STORAGE_KEY}_${Date.now()}`, value);
}
