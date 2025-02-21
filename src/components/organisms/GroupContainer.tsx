import { Card } from "../molecules/Card";
import { AddCardButton } from "../molecules/AddCardButton";
import {
  StorageCardEntityType,
  StorageEntityType,
} from "../../models/entities/storage.entity";
import { useCallback, useRef, useState } from "preact/hooks";
import {
  addCardsIntoGroup,
  modifyCards,
  modifyGroupName,
  removeCardsFromGroup,
  removeGroup,
} from "../../services/groups/update";
import { CardEntityType } from "../../models/entities/card.entity";
import { Card as UiCard, CardHeader, CardTitle } from "../ui/card";
import { Edit3, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function GroupContainer({
  group: { id, name, cards },
}: {
  group: StorageEntityType["groups"][number];
}) {
  const [width, height] = [128, 120];

  const dragCard = useRef<number>(-1);
  const draggedOverCard = useRef<number>(-1);
  const [isDrag, setDrag] = useState<boolean>(false);
  const [remove, setRemove] = useState<boolean>(false);
  const [nameEdit, setNameEdit] = useState<boolean>(false);

  const handleSort = useCallback(() => {
    const cardsClone: StorageCardEntityType[] = [...cards];
    const temp = cardsClone[dragCard.current];
    cardsClone[dragCard.current] = cardsClone[draggedOverCard.current];
    cardsClone[draggedOverCard.current] = temp;
    modifyCards(id, ...cardsClone);

    dragCard.current = -1;
    draggedOverCard.current = -1;

    setDrag(false);
    setRemove(false);
  }, [cards]);

  const addCard = useCallback(
    (card: CardEntityType) => {
      addCardsIntoGroup(id, card);
    },
    [addCardsIntoGroup, id]
  );

  return (
    <UiCard>
      <CardHeader>
        <CardTitle
          className={"relative flex items-center gap-4 border-b-2 pb-4"}
        >
          {nameEdit ? (
            <Input
              defaultValue={name}
              onChange={(event) =>
                modifyGroupName(id, (event.target as any)?.value!)
              }
              className={"w-fit"}
            />
          ) : (
            <p className={"text-xl"}>{name}</p>
          )}
          <Button variant={"outline"} onClick={() => setNameEdit(!nameEdit)}>
            <Edit3 />
          </Button>
          <Button
            className={"absolute p-5"}
            style={{
              left: "100%",
              transform: "translate(-100%,-100%)",
              top: "50%",
            }}
            variant={"secondary"}
            onClick={() => removeGroup(id)}
          >
            <Trash />
          </Button>
        </CardTitle>
      </CardHeader>
      <div
        class={
          "relative flex gap-2 flex-wrap p-4 pb-18 bg-slate-400 m-6 mt-2 rounded-2xl"
        }
      >
        {cards.map((each, index) => (
          <Card
            key={each.id}
            card={each}
            size={{
              width,
              height,
            }}
            containerProps={{
              draggable: true,
              onDragStart: () => {
                dragCard.current = index;
                setDrag(true);
              },
              onDragEnter: () => (draggedOverCard.current = index),
              onDragEnd: () => {
                if (remove) {
                  removeCardsFromGroup(id, cards[dragCard.current].id);

                  setRemove(false);
                  setDrag(false);
                  return;
                }

                handleSort();
              },
              onDragOver: (e) => e.preventDefault(),
              style: {
                width,
                height,
              },
            }}
          />
        ))}
        <AddCardButton
          addCard={addCard}
          size={{
            width,
            height,
          }}
          selectedCards={cards.map((card) => card.name)}
        />
        {isDrag && (
          <Button
            variant={"destructive"}
            className={"p-6 absolute"}
            style={{
              transform: "translate(-50%, -115%)",
              left: "50%",
              top: "100%",
            }}
            onDragEnter={() => setRemove(true)}
          >
            <Trash />
          </Button>
        )}
      </div>
    </UiCard>
  );
}
