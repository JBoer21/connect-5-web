import { json, Link, useLoaderData } from "@remix-run/react";
import { Waypoints } from "lucide-react";
import { ThemeToggle } from "./resources.theme-toggle";
import { Data } from "~/types/playerTypes";
import data from "~/data/players.json";
import { PlayerBand } from "~/components/ui/players.tsx/player-band";

export const loader = async () => {
  const typedData: Data = data as Data;

  const teamNames = Object.keys(typedData);
  const randomTeamName =
    teamNames[Math.floor(Math.random() * teamNames.length)];
  const randomTeam = typedData[randomTeamName];

  const allPlayers = randomTeam.players;
  const shuffledPlayers = [...allPlayers].sort(() => 0.5 - Math.random());

  const selectedPlayers = shuffledPlayers.slice(0, 5);

  const sortedPlayers = selectedPlayers.sort(
    (a, b) => b.num_clubs - a.num_clubs,
  );

  return json({
    teamName: randomTeamName,
    players: sortedPlayers,
  });
};

export default function Index() {
  const { teamName, players } = useLoaderData();

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
        <>
          <h2 className="mb-4 text-2xl font-bold text-center">
            Team: {teamName}
          </h2>
          <PlayerBand
            players={players.map((player) => ({
              name: player.short_name,
              imageUrl: player.player_image_url,
            }))}
          />
        </>
      </div>
    </div>
  );
}
