import { useCallback } from "preact/hooks";
import {
  StorageCardEntityType,
  StorageEntityType,
} from "../../models/entities/storage.entity";
import { appendUrlPath } from "../../utils/path";
import { Button } from "../ui/button";
import { addCardCounter } from "../../services/groups/update";

export function CardCounter({
  groupId,
  card: { id, iconPath, count },
  size,
}: {
  groupId: StorageEntityType["groups"][number]["id"];
  card: StorageCardEntityType;
  size: number;
}) {
  const [width, height] = [size, size];

  const onClick = useCallback(
    (click: "CLICK" | "CONTEXT") => {
      addCardCounter(groupId, id, click === "CLICK");
    },
    [addCardCounter, groupId, id]
  );

  return (
    <div>
      <div
        style={{
          height,
          width,
        }}
      >
        <Button
          className={"m-0 p-0 h-fit hover:opacity-90 relative"}
          variant={"ghost"}
          onClick={() => onClick("CLICK")}
          onContextMenu={(e) => {
            e.preventDefault();
            onClick("CONTEXT");
          }}
        >
          <img
            src={appendUrlPath(iconPath)}
            height={height}
            width={width}
            style={{ objectFit: "cover", height, width, borderRadius: "5px" }}
            className={
              "border-solid border-2 border-slate-500 pointer-events-none select-none"
            }
          />
          <div
            className={
              "bg-slate-200 flex items-center justify-center w-fit px-2 border-1 border-slate-500 absolute"
            }
            style={{
              left: "100%",
              top: "100%",
              transform: "translate(-100%,-100%)",
            }}
          >
            <p
              className={"text-4xl font-bold"}
              style={{
                fontSize: `${Math.max(15, Math.min(size * 0.2, 52))}px`,
                padding: 0,
                margin: 0,
                minWidth: 0,
              }}
            >
              {count}
            </p>
          </div>
        </Button>
      </div>
    </div>
  );
}
