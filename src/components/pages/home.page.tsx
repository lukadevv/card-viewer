import { Plus } from "lucide-react";
import { useStorage } from "../../hooks/storage.hook";
import { GroupContainer } from "../organisms/GroupContainer";
import { Button } from "../ui/button";
import { createGroup } from "../../services/groups/update";

export function HomePage() {
  const {
    value: { groups },
  } = useStorage();

  return (
    <main>
      <div>
        <div className={"flex flex-col gap-4"}>
          {groups.map((each) => (
            <GroupContainer group={each} />
          ))}
        </div>
        <div className={"flex items-center justify-center my-4"}>
          <Button
            variant={"secondary"}
            size={"lg"}
            className={"h-24 w-24"}
            onClick={() => createGroup()}
          >
            <Plus />
          </Button>
        </div>
      </div>
    </main>
  );
}
