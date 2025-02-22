import { useRouter } from "preact-router";
import { useMemo } from "preact/hooks";
import { useStorage } from "../../hooks/storage.hook";
import { CardCounter } from "../molecules/CardCounter";

export function ViewPage() {
  const [
    {
      matches: { id },
    },
  ] = useRouter() as any;
  const { value } = useStorage();

  const group = useMemo(
    () => value.groups.find(({ id: gId }) => gId === id),
    [value]
  );

  if (!group) {
    return <></>;
  }

  return (
    <section
      className={"w-[100vw] h-[100vh] overflow-hidden"}
      style={{
        background: group.display.background,
      }}
    >
      <div
        className={`grid w-fit`}
        style={{
          gridTemplateColumns: Array(group.display.columns)
            .fill("1fr")
            .join(" "),
        }}
      >
        {group.cards.map((card) => (
          <CardCounter key={card.id} card={card} group={group} />
        ))}
      </div>
    </section>
  );
}
