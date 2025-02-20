import { CardEntityType } from "../../models/entities/card.entity";
import {
  STORAGE_EVENT_KEY,
  STORAGE_KEY,
  StorageEntityType,
} from "../../models/entities/storage.entity";
import { generateRandomID } from "../../utils/uid";
import { extractStorage } from "./read";

export function addCardsIntoGroup(
  groupId: StorageEntityType["groups"][number]["id"],
  ...cards: CardEntityType[]
) {
  const storage = extractStorage();

  let group = storage.groups.find((each) => each.id === groupId);

  if (!group) {
    // Create a new group
    group = {
      id: generateRandomID(),
      name: "Nameless",
      cards: cards.map((each) => ({
        ...each,
        count: 0,
      })),
    };
  } else {
    // Add cards
    group.cards.push(
      ...cards.map((each) => ({
        ...each,
        count: 0,
      }))
    );
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));

  // Fire event for listeners, to re-hydrate components
  document.dispatchEvent(new Event(STORAGE_EVENT_KEY));
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
  document.dispatchEvent(new Event(STORAGE_EVENT_KEY));
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
  document.dispatchEvent(new Event(STORAGE_EVENT_KEY));
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
  document.dispatchEvent(new Event(STORAGE_EVENT_KEY));
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
  document.dispatchEvent(new Event(STORAGE_EVENT_KEY));
}
