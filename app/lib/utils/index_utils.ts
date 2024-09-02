// app/lib/utils/index_utils.ts

import { IndexLoaderData } from "~/types/playerTypes";
import gameStates from "~/data/game_states.json";

export function getGameStateForDate(date: Date): number {
  const baseDate = new Date(2024, 7, 31); // Month is 0-indexed, so 7 is August
  const timeDiff = date.getTime() - baseDate.getTime();
  const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
  return dayDiff + 1;
}

export function setGame(): IndexLoaderData {
  const currentDate = new Date();
  const localMidnight = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
  );
  const gameStateId = getGameStateForDate(localMidnight);

  // Subtract 1 from gameStateId to convert to zero-based index
  const gameState = gameStates[gameStateId - 1];

  if (!gameState) {
    throw new Error(`No game state found for ID: ${gameStateId}`);
  }

  return {
    teamName: gameState.state.teamName,
    teamLogo: gameState.state.teamLogo,
    players: gameState.state.players,
  };
}
