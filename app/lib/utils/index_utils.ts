// app/lib/utils/index_utils.ts

import { json } from "@remix-run/node";
import { IndexLoaderData } from "~/types/playerTypes";
import gameStates from "~/data/game_states.json";

export function getGameStateForDate(date: Date): number {
  const baseDate = new Date("2024-08-25"); // Choose a fixed start date
  const timeDiff = date.getTime() - baseDate.getTime();
  const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
  return dayDiff + 1; // Add 1 to start from game state 1
}

export function setGame() {
  const currentDate = new Date();
  const gameStateId = getGameStateForDate(currentDate);

  // Subtract 1 from gameStateId to convert to zero-based index
  const gameState = gameStates[gameStateId - 1];

  if (!gameState) {
    throw new Error(`No game state found for ID: ${gameStateId}`);
  }

  return json<IndexLoaderData>({
    teamName: gameState.state.teamName,
    teamLogo: gameState.state.teamLogo,
    players: gameState.state.players,
  });
}
