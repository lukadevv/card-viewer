import { useCallback } from "preact/hooks";
import {
  StorageCardEntityType,
  StorageEntityType,
} from "../../models/entities/storage.entity";
import { appendUrlPath } from "../../utils/path";
import { Button } from "../ui/button";
import { addCardCounter } from "../../services/groups/update";
import { SIZE } from "./Card";

export function CardCounter({
  group,
  card: { id, iconPath, count },
}: {
  group: StorageEntityType["groups"][number];
  card: StorageCardEntityType;
}) {
  const groupId = group.id;
  const onClick = useCallback(
    (click: "CLICK" | "CONTEXT") => {
      addCardCounter(groupId, id, click === "CLICK");
    },
    [addCardCounter, groupId, id]
  );

  const [width, height] = SIZE;

  return (
    <div>
      <div
        style={{
          width,
          height,
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
          aria-label={"Increase/Decrease counter"}
        >
          <img
            src={appendUrlPath(iconPath)}
            width={width}
            height={height}
            style={{
              objectFit: "cover",
              width,
              height,
              borderRadius: "5px",
            }}
            className={
              "border-solid border-2 border-slate-500 pointer-events-none select-none"
            }
            alt={"Card image"}
          />
          <div
            className={
              "flex items-center justify-center w-fit px-2 border-1 border-slate-500 absolute"
            }
            style={{
              left: "100%",
              top: "100%",
              transform: "translate(-100%,-100%)",
              background: group.display.counterBackground,
            }}
          >
            <p
              className={""}
              style={{
                fontSize: `${Math.max(15, Math.min(width * 0.2, 52))}px`,
                padding: 0,
                margin: 0,
                minWidth: 0,
                color: group.display.counterColor,
                fontFamily: `Atkinson Hyperlegible Mono`,
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
