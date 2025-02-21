import { useState } from "preact/hooks";
import { CardsCombobox } from "../atoms/SearchCombobox";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContentWithoutClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { CardEntityType } from "../../models/entities/card.entity";
import { appendUrlPath } from "../../utils/path";
import { Plus } from "lucide-react";

export function AddCardButton({
  addCard,
  size: { height, width },
  selectedCards,
}: {
  addCard: (card: CardEntityType) => void;
  size: {
    width: number;
    height: number;
  };
  selectedCards: CardEntityType["name"][];
}) {
  const [card, setCard] = useState<CardEntityType>();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          variant={"secondary"}
          onClick={() => setOpen(true)}
          style={{
            width,
            height,
          }}
        >
          <Plus size={64} />
        </Button>
      </DialogTrigger>
      <DialogContentWithoutClose className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add card</DialogTitle>
          <DialogDescription>
            Select a card to add into the current group, search it by the name
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <CardsCombobox
            card={card}
            setCard={setCard}
            selectedCards={selectedCards}
          />
          <div className={"pointer-events-none select-none"}>
            {card ? (
              <img
                class={"w-[150px] h-[150px] border-2 rounded-xl m-auto"}
                src={appendUrlPath(card.iconPath)}
                alt={"Card image"}
                width={150}
                height={150}
              />
            ) : (
              <div class={"w-[150px] h-[150px] border-2 rounded-xl m-auto"} />
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            className={"w-full"}
            variant={"secondary"}
            onClick={() => {
              setCard(undefined);
              setOpen(false);
            }}
          >
            Close
          </Button>
          <Button
            type="submit"
            className={"w-full"}
            disabled={!card}
            onClick={() => {
              if (!card) {
                return;
              }

              addCard(card);
              setOpen(false);
              setCard(undefined);
            }}
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContentWithoutClose>
    </Dialog>
  );
}
