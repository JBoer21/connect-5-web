// app/lib/utils/index_utils.ts

import { json } from "@remix-run/node";
import { ClubData, IndexLoaderData } from "~/types/playerTypes";
import data from "~/data/players.json";
import { getAvailableTeams, removeTeam, resetTeams } from "./gameState";

export function setGame() {
  const typedData: ClubData = data as ClubData;
  
  let teamNames = getAvailableTeams();

  console.log(teamNames.length)
  
  // If all teams have been used, reset the available teams
  if (teamNames.length === 0) {
    resetTeams();
    teamNames = getAvailableTeams();
  }

  const randomTeamName = teamNames[Math.floor(Math.random() * teamNames.length)];
  const randomTeam = typedData[randomTeamName];

  // Remove the selected team from available teams
  removeTeam(randomTeamName);

  const allPlayers = randomTeam.players;
  const shuffledPlayers = [...allPlayers].sort(() => 0.5 - Math.random());

  const selectedPlayers = shuffledPlayers.slice(0, 5);

  const sortedPlayers = selectedPlayers.sort(
    (a, b) => b.num_clubs - a.num_clubs,
  );

  return json<IndexLoaderData>({
    teamName: randomTeamName,
    teamLogo: randomTeam.logo,
    players: sortedPlayers,
  });
}
