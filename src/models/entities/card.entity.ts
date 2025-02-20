import { InferType, object, string } from "yup";

export enum CardType {
  DRAGON = "Dragon",
  SPELLCASTER = "Spellcaster",
  BEAST_WARRIOR = "Beast_Warrior",
  FIEND = "Fiend",
  PLANT = "Plant",
  ZOMBIE = "Zombie",
  DINOSAUR = "Dinosaur",
  WARRIOR = "Warrior",
  WINGED_BEAST = "Winged_Beast",
  BEAST = "Beast",
  ROCK = "Rock",
  PYRO = "Pyro",
  THUNDER = "Thunder",
  INSECT = "Insect",
  REPTILE = "Reptile",
  FISH = "Fish",
  AQUA = "Aqua",
  SEA_SERPENT = "Sea_Serpent",
  FAIRY = "Fairy",
  MACHINE = "Machine",
}

export enum CardCategory {
  MONSTER = "Monster",
  EQUIP = "Equip",
  MAGIC = "Magic",
  FIELD = "Field",
  RITUAL = "Ritual",
  TRAP = "Trap",
}

type NumberType = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

export type IdType =
  | `${NumberType}${NumberType}${NumberType}`
  | `${NumberType}${NumberType}`
  | `${NumberType}`;

export type CardEntityType = InferType<typeof CardEntity>;

export const CardEntity = object({
  id: string<IdType>().required(),
  name: string().required(),
  type: string<CardType>().oneOf<CardType>(Object.values(CardType)).optional(),
  category: string()
    .oneOf<CardCategory>(Object.values(CardCategory))
    .required(),
  iconPath: string().required(),
}).required();
