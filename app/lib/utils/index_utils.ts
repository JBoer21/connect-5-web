// app/lib/utils/index_utils.ts

import { json } from "@remix-run/node";
import { ClubData, IndexLoaderData } from "~/types/playerTypes";
import data from "~/data/players.json";
import { getAvailableTeams, removeTeam, resetTeams } from "./gameState";
import gameStates from "~/data/game_states.json";

export function getGameStateForDate(date: Date): number {
  const baseDate = new Date("2023-08-23"); // Choose a fixed start date
  const timeDiff = date.getTime() - baseDate.getTime();
  const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
  return dayDiff + 1; // Add 1 to start from game state 1
}

export function setGame() {
  const typedData: ClubData = data as ClubData;

  let teamNames = getAvailableTeams();

  console.log(teamNames.length);

  // If all teams have been used, reset the available teams
  if (teamNames.length === 0) {
    resetTeams();
    teamNames = getAvailableTeams();
  }

  const randomTeamName =
    teamNames[Math.floor(Math.random() * teamNames.length)];
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

export function setGame2() {
  const currentDate = new Date();
  const gameStateId = getGameStateForDate(currentDate);

  const gameState = gameStates.find((state) => state.id === gameStateId);

  if (!gameState) {
    throw new Error(`No game state found for ID: ${gameStateId}`);
  }

  return json<IndexLoaderData>({
    teamName: gameState.state.teamName,
    teamLogo: gameState.state.teamLogo,
    players: gameState.state.players,
  });
}
