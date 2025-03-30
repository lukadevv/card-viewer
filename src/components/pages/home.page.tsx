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
        alt={"Card image"}
      />
      <section>
        <div
          className={
            "bg-red-600/80 rounded-xl border-yellow-700 border-1 p-4 mb-8 opacity-90"
          }
        >
          <p>
            This project has been migrated to a new platform, you can now find{" "}
            <a href={"https://fusion.lukadevv.com/viewer"}>
              <strong
                className={"underline text-yellow-200 hover:text-yellow-300"}
              >
                Card Viewer
              </strong>
            </a>{" "}
            along with more tools in the new project{" "}
            <a href={"https://fusion.lukadevv.com/"}>
              <strong
                className={"underline text-yellow-200 hover:text-yellow-300"}
              >
                Fusion Simulator
              </strong>
            </a>
            .
          </p>
        </div>
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
            aria-label={"Create new group"}
          >
            <Plus />
          </Button>
        </div>
      </section>
      <Footer />
    </main>
  );
}
