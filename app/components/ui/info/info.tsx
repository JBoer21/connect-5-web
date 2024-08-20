import { HoverCard, HoverCardContent, HoverCardTrigger } from "../hover-card";

export function HoverHelp() {
  return (
    <HoverCard>
      <HoverCardTrigger>Hover</HoverCardTrigger>
      <HoverCardContent>
        The React Framework – created and maintained by @vercel.
      </HoverCardContent>
    </HoverCard>
  );
}
