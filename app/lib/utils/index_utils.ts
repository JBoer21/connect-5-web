import { json } from "@remix-run/node";
import data from "~/data/players.json";
import { Data, IndexLoaderData } from "~/types/player1Types";

export function setGame1() {
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

  return json<IndexLoaderData>({
    teamName: randomTeamName,
    players: sortedPlayers,
  });
}
