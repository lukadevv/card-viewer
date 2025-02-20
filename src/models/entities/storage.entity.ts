import { array, InferType, number, object, string } from "yup";
import { CardCategory, CardType, IdType } from "./card.entity";

export type StorageEntityType = InferType<typeof StorageEntity>;

export const CardEntityCountEntity = object({
  id: string<IdType>().required(),
  name: string().required(),
  type: string<CardType>().oneOf<CardType>(Object.values(CardType)).optional(),
  category: string()
    .oneOf<CardCategory>(Object.values(CardCategory))
    .required(),
  iconPath: string().required(),
  count: number().default(0).min(0).max(999).required(),
}).required();

export const StorageEntity = object({
  groups: array(
    object({
      id: string().length(128).required(),
      name: string().required(),
      cards: array(CardEntityCountEntity).required(),
    })
  ).default([]),
}).required();

export const STORAGE_KEY = "storage";
export const STORAGE_EVENT_KEY = "storage_event";
