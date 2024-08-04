import { json } from "@remix-run/node";
import { ClubData, IndexLoaderData } from "~/types/playerTypes";
import data from "~/data/players.json";

export function setGame() {
  const typedData: ClubData = data as ClubData;

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

  console.log(randomTeamName, randomTeam.logo, sortedPlayers);

  return json<IndexLoaderData>({
    teamName: randomTeamName,
    teamLogo: randomTeam.logo,
    players: sortedPlayers,
  });
}
