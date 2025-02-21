import { useEffect, useMemo, useState } from "preact/hooks";
import { CardEntityType, IdType } from "../../models/entities/card.entity";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { CARDS } from "../../models/cards";
import { cn } from "../../lib/utils";

const searchValues: {
  value: CardEntityType["name"];
  label: string;
}[] = CARDS.map((card) => ({
  value: card.name,
  label: card.name,
}));

export function CardsCombobox({
  card,
  setCard,
  selectedCards,
}: {
  card?: CardEntityType;
  setCard: React.Dispatch<React.SetStateAction<CardEntityType | undefined>>;
  selectedCards: CardEntityType["name"][];
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<CardEntityType["name"] | undefined>(
    (card?.id as IdType) ?? undefined
  );

  useEffect(() => {
    if (!value) {
      return;
    }

    const card = CARDS.find((each) => each.name === value);

    if (!card) {
      return;
    }

    setCard(card);
  }, [value]);

  const availableSearchValues = useMemo(() => {
    return searchValues.filter((each) => !selectedCards.includes(each.value));
  }, [searchValues, card]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? availableSearchValues.find((each) => each.value === value)?.label
            : "Select card..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search card..." className="h-9" />
          <CommandList>
            <CommandEmpty>No card found.</CommandEmpty>
            <CommandGroup>
              {availableSearchValues.map((card) => (
                <CommandItem
                  key={card.value}
                  value={card.value}
                  onSelect={(currentValue) => {
                    if (!currentValue) {
                      setValue(undefined);

                      return;
                    }

                    setValue(currentValue as IdType);
                    setOpen(false);
                  }}
                >
                  {card.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === card.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
