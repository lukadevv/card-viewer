import { CardEntityType } from "../../models/entities/card.entity";
import {
  STORAGE_EVENT_KEY,
  STORAGE_KEY,
  StorageCardEntityType,
  StorageEntityType,
} from "../../models/entities/storage.entity";
import { generateRandomID } from "../../utils/uid";
import { extractStorage } from "./read";

const broadcastChannel = new BroadcastChannel("app");

function updateEvent() {
  document.dispatchEvent(new Event(STORAGE_EVENT_KEY));
  broadcastChannel.postMessage("");
}

export function addCardsIntoGroup(
  groupId: StorageEntityType["groups"][number]["id"],
  ...cards: CardEntityType[]
) {
  const storage = extractStorage();

  let group = storage.groups.find((each) => each.id === groupId);

  if (!group) {
    return;
  }

  // Add cards
  group.cards.push(
    ...cards.map((each) => ({
      ...each,
      count: 0,
    }))
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

  // Fire event for listeners, to re-hydrate components
  updateEvent();
}

export function removeCardsFromGroup(
  groupId: StorageEntityType["groups"][number]["id"],
  ...cards: CardEntityType["id"][]
) {
  const storage = extractStorage();

  let group = storage.groups.find((each) => each.id === groupId);

  if (!group) {
    return;
  }

  // Modify group cards
  group.cards = group.cards.filter((each) => !cards.includes(each.id));

  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

  // Fire event for listeners, to re-hydrate components
  updateEvent();
}

export function clearCardsFromGroup(
  groupId: StorageEntityType["groups"][number]["id"]
) {
  const storage = extractStorage();

  let group = storage.groups.find((each) => each.id === groupId);

  if (!group) {
    return;
  }

  // Modify group cards
  group.cards = [];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

  // Fire event for listeners, to re-hydrate components
  updateEvent();
}

export function removeGroup(
  groupId: StorageEntityType["groups"][number]["id"]
) {
  const storage = extractStorage();

  let group = storage.groups.find((each) => each.id === groupId);

  if (!group) {
    return;
  }

  // Filter groups
  storage.groups = storage.groups.filter((each) => each.id !== groupId);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

  // Fire event for listeners, to re-hydrate components
  updateEvent();
}

export function addCardCounter(
  groupId: StorageEntityType["groups"][number]["id"],
  id: CardEntityType["id"],
  add: boolean
) {
  const storage = extractStorage();

  let group = storage.groups.find((each) => each.id === groupId);

  if (!group) {
    return;
  }

  const card = group.cards.find((each) => each.id === id);

  if (!card) {
    return;
  }

  card.count = Math.max(
    Math.min(add ? card.count + 1 : card.count - 1, 999),
    0
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

  // Fire event for listeners, to re-hydrate components
  updateEvent();
}

export function clearCounters(
  groupId: StorageEntityType["groups"][number]["id"]
) {
  const storage = extractStorage();

  let group = storage.groups.find((each) => each.id === groupId);

  if (!group) {
    return;
  }

  for (const card of group.cards) {
    card.count = 0;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

  // Fire event for listeners, to re-hydrate components
  updateEvent();
}

export function modifyCards(
  groupId: StorageEntityType["groups"][number]["id"],
  ...cards: StorageCardEntityType[]
) {
  const storage = extractStorage();

  let group = storage.groups.find((each) => each.id === groupId);

  if (!group) {
    return;
  }

  group.cards = cards;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

  // Fire event for listeners, to re-hydrate components
  updateEvent();
}

export function modifyGroupName(
  groupId: StorageEntityType["groups"][number]["id"],
  name: StorageEntityType["groups"][number]["name"]
) {
  const storage = extractStorage();

  let group = storage.groups.find((each) => each.id === groupId);

  if (!group) {
    return;
  }

  group.name = name;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

  // Fire event for listeners, to re-hydrate components
  updateEvent();
}

export function createGroup() {
  const storage = extractStorage();

  storage.groups.push({
    id: generateRandomID(),
    cards: [],
    name: "Untitled",
    display: {
      columns: 1,
      background: "#000000",
      counterBackground: "#ffffff",
      counterColor: "#000000",
    },
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

  // Fire event for listeners, to re-hydrate components
  updateEvent();
}

export function addGroupColumn(
  groupId: StorageEntityType["groups"][number]["id"],
  add: boolean
) {
  const storage = extractStorage();

  let group = storage.groups.find((each) => each.id === groupId);

  if (!group) {
    return;
  }

  const total = add ? group.display.columns + 1 : group.display.columns - 1;

  group.display.columns = Math.max(Math.min(total, 64), 1);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

  // Fire event for listeners, to re-hydrate components
  updateEvent();
}

export function setGroupBackground(
  groupId: StorageEntityType["groups"][number]["id"],
  color: StorageEntityType["groups"][number]["display"]["background"]
) {
  const storage = extractStorage();

  let group = storage.groups.find((each) => each.id === groupId);

  if (!group) {
    return;
  }

  group.display.background = color;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

  // Fire event for listeners, to re-hydrate components
  updateEvent();
}

export function setGroupCounterBackground(
  groupId: StorageEntityType["groups"][number]["id"],
  color: StorageEntityType["groups"][number]["display"]["counterBackground"]
) {
  const storage = extractStorage();

  let group = storage.groups.find((each) => each.id === groupId);

  if (!group) {
    return;
  }

  group.display.counterBackground = color;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

  // Fire event for listeners, to re-hydrate components
  updateEvent();
}

export function setGroupCounterColor(
  groupId: StorageEntityType["groups"][number]["id"],
  color: StorageEntityType["groups"][number]["display"]["counterColor"]
) {
  const storage = extractStorage();

  let group = storage.groups.find((each) => each.id === groupId);

  if (!group) {
    return;
  }

  group.display.counterColor = color;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

  // Fire event for listeners, to re-hydrate components
  updateEvent();
}
