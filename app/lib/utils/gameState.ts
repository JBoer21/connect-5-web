import { ClubData } from "~/types/playerTypes";
import data from "~/data/players.json";

let availableTeams: string[] = Object.keys(data as ClubData);

export function getAvailableTeams(): string[] {
  return availableTeams;
}

export function removeTeam(teamName: string): void {
  availableTeams = availableTeams.filter((team) => team !== teamName);
}

export function resetTeams(): void {
  availableTeams = Object.keys(data as ClubData);
}
