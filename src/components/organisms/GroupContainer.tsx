import { Card, SIZE } from "../molecules/Card";
import { AddCardButton } from "../molecules/AddCardButton";
import {
  StorageCardEntityType,
  StorageEntityType,
} from "../../models/entities/storage.entity";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import {
  addCardsIntoGroup,
  addGroupColumn,
  modifyCards,
  modifyGroupName,
  removeCardsFromGroup,
  removeGroup,
  setGroupBackground,
  setGroupCounterBackground,
  setGroupCounterColor,
} from "../../services/groups/update";
import { CardEntityType } from "../../models/entities/card.entity";
import {
  Card as UiCard,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Edit3, PipetteIcon, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { appendUrlPath } from "../../utils/path";
import ColorPicker from "../ui/color-picker";
import { useWindowSize } from "../../hooks/window.hook";

export function GroupContainer({
  group: {
    id,
    name,
    cards,
    display: { columns, background, counterBackground, counterColor },
  },
}: {
  group: StorageEntityType["groups"][number];
}) {
  const [{ width, height }, setCardSize] = useState<{
    width: number;
    height: number;
  }>({
    width: SIZE[0],
    height: SIZE[1],
  });

  const dragCard = useRef<number>(-1);
  const draggedOverCard = useRef<number>(-1);
  const [isDrag, setDrag] = useState<boolean>(false);
  const [remove, setRemove] = useState<boolean>(false);
  const [nameEdit, setNameEdit] = useState<boolean>(false);
  const size = useWindowSize();

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

  useEffect(() => {
    if (size.width <= 345) {
      const scaleFactor = Math.max(0.005, Math.min(1.5, size.width / 720));

      setCardSize(() => ({
        width: SIZE[0] * scaleFactor,
        height: SIZE[1] * scaleFactor,
      }));
    } else if (size.width <= 521) {
      const scaleFactor = Math.max(0.005, Math.min(1.5, size.width / 640));

      setCardSize(() => ({
        width: SIZE[0] * scaleFactor,
        height: SIZE[1] * scaleFactor,
      }));
    } else {
      setCardSize(() => ({
        width: SIZE[0],
        height: SIZE[1],
      }));
    }
  }, [size]);

  return (
    <UiCard>
      <CardHeader>
        <CardTitle
          className={
            "relative flex items-center gap-4 border-b-2 pb-4 animate-in animate-bounce"
          }
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
          <Button
            variant={"outline"}
            onClick={() => setNameEdit(!nameEdit)}
            aria-label={"Edit name"}
          >
            <Edit3 />
          </Button>
          <Button
            className={"absolute p-5 h-full"}
            style={{
              left: "100%",
              transform: "translate(-100%,-75%)",
              top: "50%",
            }}
            variant={"secondary"}
            onClick={() => removeGroup(id)}
            aria-label={"Remove group"}
          >
            <Trash />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className={"flex flex-col gap-4"}>
        <div>
          <div class={"relative gap-2 p-4 pb-18 mt-2 rounded-2xl"}>
            <div
              className={`grid w-fit gap-1 m-auto`}
              style={{
                gridTemplateColumns: Array(columns).fill("1fr").join(" "),
              }}
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
                  aria-label={"Remove card"}
                >
                  <Trash />
                </Button>
              )}
            </div>
          </div>
        </div>
        <div>
          <div class={"relative gap-2 p-4 bg-slate-700 mt-2 rounded-2xl"}>
            <div className={"w-full flex flex-col gap-2"}>
              <ColumnsButton groupId={id} columns={columns} />
              <BackgroundColor groupId={id} background={background} />
              <CounterBackgroundColor
                groupId={id}
                counterColor={counterBackground}
              />
              <CounterColor groupId={id} counterColor={counterColor} />
            </div>
          </div>
        </div>
        <CardFooter className={"p-0"}>
          <Button
            variant={"secondary"}
            className={"w-full uppercase"}
            onClick={() => {
              window.open(
                appendUrlPath(`/view/${id}`),
                "_blank",
                `menubar=no,toolbar=no,location=no,status=no,resizable=no,scrollbars=no,fullscreen=no,width=${
                  SIZE[0] * columns
                },height=${SIZE[1] * Math.ceil(cards.length / columns)}`
              );
            }}
            disabled={cards.length < 1}
            aria-label={"Open viewer"}
          >
            view
          </Button>
        </CardFooter>
      </CardContent>
    </UiCard>
  );
}

function ColumnsButton({
  groupId,
  columns,
}: {
  groupId: StorageEntityType["groups"][number]["id"];
  columns: number;
}) {
  return (
    <div className={"flex gap-4 items-center justify-between"}>
      <p>Columns</p>
      <div className={"flex gap-0.5"}>
        <Button
          disabled={columns < 2}
          onClick={() => addGroupColumn(groupId, false)}
          aria-label={"Decrease columns"}
        >
          -
        </Button>
        <Button aria-label={"Total columns"}>{columns}</Button>
        <Button
          disabled={columns > 64}
          onClick={() => addGroupColumn(groupId, true)}
          aria-label={"Increase columns"}
        >
          +
        </Button>
      </div>
    </div>
  );
}

function BackgroundColor({
  groupId,
  background,
}: Pick<StorageEntityType["groups"][number]["display"], "background"> & {
  groupId: StorageEntityType["groups"][number]["id"];
}) {
  return (
    <div className={"flex gap-4 items-center justify-between"}>
      <p>Background</p>
      <div className={"flex gap-0.5"}>
        <ColorPicker
          onChange={(value) => setGroupBackground(groupId, value)}
          value={background}
        >
          <Button
            variant={"secondary"}
            style={{
              backgroundColor: background,
            }}
            aria-label={"Change color"}
          >
            <PipetteIcon
              style={{
                color: "lightgray",
              }}
            />
          </Button>
        </ColorPicker>
      </div>
    </div>
  );
}

function CounterBackgroundColor({
  groupId,
  counterColor,
}: Pick<StorageEntityType["groups"][number]["display"], "counterColor"> & {
  groupId: StorageEntityType["groups"][number]["id"];
}) {
  return (
    <div className={"flex gap-4 items-center justify-between"}>
      <p>Counter background</p>
      <div className={"flex gap-0.5"}>
        <ColorPicker
          onChange={(value) => setGroupCounterBackground(groupId, value)}
          value={counterColor}
        >
          <Button
            variant={"secondary"}
            style={{
              backgroundColor: counterColor,
            }}
            aria-label={"Change color"}
          >
            <PipetteIcon
              style={{
                color: "lightgray",
              }}
            />
          </Button>
        </ColorPicker>
      </div>
    </div>
  );
}

function CounterColor({
  groupId,
  counterColor,
}: Pick<StorageEntityType["groups"][number]["display"], "counterColor"> & {
  groupId: StorageEntityType["groups"][number]["id"];
}) {
  return (
    <div className={"flex gap-4 items-center justify-between"}>
      <p>Counter color</p>
      <div className={"flex gap-0.5"}>
        <ColorPicker
          onChange={(value) => setGroupCounterColor(groupId, value)}
          value={counterColor}
        >
          <Button
            variant={"secondary"}
            style={{
              backgroundColor: counterColor,
            }}
            aria-label={"Change color"}
          >
            <PipetteIcon
              style={{
                color: "lightgray",
              }}
            />
          </Button>
        </ColorPicker>
      </div>
    </div>
  );
}
