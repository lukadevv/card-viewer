import { HTMLAttributes } from "preact/compat";
import { CardEntityType } from "../../models/entities/card.entity";
import { appendUrlPath } from "../../utils/path";
import { Button } from "../ui/button";

export function Card({
  card: { iconPath },
  size: { height, width },
  containerProps,
}: {
  card: CardEntityType;
  size: {
    width: number;
    height: number;
  };
  containerProps?: HTMLAttributes<HTMLDivElement>;
}) {
  return (
    <div {...containerProps}>
      <Button
        className={
          "m-0 p-0 h-fit hover:opacity-80 relative cursor-grab active:cursor-grabbing"
        }
        variant={"ghost"}
        aria-label={"Card"}
        style={{
          pointerEvents: "none",
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
          alt={"Card image"}
        />
      </Button>
    </div>
  );
}

export const SIZE = [102 * 1.2, 96 * 1.2];
