import { GithubIcon } from "lucide-react";
import { ButtonAnchor } from "../ui/button_anchor";

export function GithubButton() {
  return (
    <ButtonAnchor
      variant="destructive"
      size="icon"
      href="https://github.com/lukadevv/card-viewer"
      aria-label="Creator github profile"
      className="max-[230px]:hidden"
    >
      <GithubIcon />
    </ButtonAnchor>
  );
}
