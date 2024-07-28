import { Link } from "@remix-run/react";
import { Waypoints } from "lucide-react";
import { ThemeToggle } from "./resources.theme-toggle";
import { PlayerCard } from "~/components/ui/players.tsx/player-card";

import data from "~/data/players.json";

export const loader = () => {
  console.log(data);
  return null;
};

export default function Index() {
  return (
    <div>
      <nav className="flex items-center justify-between w-full p-4">
        <Link to="/" className="flex items-center space-x-2">
          <Waypoints />
          <h1 className="text-xl font-semibold">Connect 5</h1>
        </Link>
        <ThemeToggle />
      </nav>

      <div className="px-4">
        <PlayerCard
          name="Zlatan Ibrahimovic"
          imageUrl="https://cdn.fifacm.com/content/media/imgs/fifa21/players/p41236.png?v=22"
        />
      </div>
    </div>
  );
}
