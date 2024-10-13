import { IndexLoaderData } from "~/types/playerTypes";
import playerData from "~/data/players.json";

export function createRandomGameState(): IndexLoaderData {
  const teamNames = Object.keys(playerData) as Array<keyof typeof playerData>;
  const randomTeamName =
    teamNames[Math.floor(Math.random() * teamNames.length)];
  const players = playerData[randomTeamName].players as {
    name: string;
    image_url: string;
    num_clubs: number;
  }[];
  const randomPlayers: {
    name: string;
    image_url: string;
    num_clubs: number;
  }[] = [];

  // Shuffle the players array and select a random subset without duplicates
  const selectedIndices = new Set<number>();
  while (selectedIndices.size < 5) {
    const randomIndex = Math.floor(Math.random() * players.length);
    selectedIndices.add(randomIndex);
  }

  selectedIndices.forEach((index) => {
    randomPlayers.push(players[index]);
  });

  return {
    teamName: randomTeamName,
    teamLogo: playerData[randomTeamName].logo, // Use the logo from the selected team
    players: randomPlayers,
  };
}
