import { Plus } from "lucide-react";
import { useStorage } from "../../hooks/storage.hook";
import { GroupContainer } from "../organisms/GroupContainer";
import { Button } from "../ui/button";
import { createGroup } from "../../services/groups/update";
import { Footer } from "../organisms/Footer";
import { appendUrlPath } from "../../utils/path";

export function HomePage() {
  const {
    value: { groups },
  } = useStorage();

  return (
    <main>
      <img
        src={appendUrlPath("/background.webp")}
        width={"100vw"}
        height={"100vh"}
        style={{
          width: "100vw",
          height: "100vh",
          animationDuration: "150s",
        }}
        class={"fixed left-0 top-0 object-cover -z-10 animate-pulse"}
      />
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
      <Footer />
    </main>
  );
}
