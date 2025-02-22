import { GithubButton } from "../atoms/GithubButton";
import { Card, CardContent } from "../ui/card";

export function Footer() {
  return (
    <footer className={"w-full relative mt-28"}>
      <Card className={"py-2"}>
        <CardContent className={"text-center"}>
          <p className={"font-bold uppercase mb-2"}>Github</p>
          <GithubButton />
        </CardContent>
      </Card>
    </footer>
  );
}
