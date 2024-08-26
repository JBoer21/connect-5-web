import { ClubData } from "~/types/playerTypes";
import data from "./players.json";
import { teams } from "./teams";

describe("Player data is correct", () => {
  const typedData: ClubData = data as ClubData;

  test("Data is not empty", () => {
    expect(Object.keys(typedData).length).toBeGreaterThan(0);
  });

  test("Each team has required properties", () => {
    Object.values(typedData).forEach((team) => {
      expect(team).toHaveProperty("name");
      expect(team).toHaveProperty("logo");
      expect(team).toHaveProperty("players");
    });
  });

  test("Each player has required properties", () => {
    Object.values(typedData).forEach((team) => {
      team.players.forEach((player) => {
        expect(player).toHaveProperty("name");
        expect(player).toHaveProperty("image_url");
        expect(player).toHaveProperty("num_clubs");
      });
    });
  });

  test("Player num_clubs is a positive integer", () => {
    Object.values(typedData).forEach((team) => {
      team.players.forEach((player) => {
        expect(Number.isInteger(player.num_clubs)).toBe(true);
        expect(player.num_clubs).toBeGreaterThan(0);
      });
    });
  });

  test("Each key matches the name property of its value object", () => {
    Object.entries(typedData).forEach(([key, value]) => {
      expect(key).toBe(value.name);
    });
  });

  test("Every key in typedData exists in the teams array", () => {
    Object.keys(typedData).forEach((key) => {
      expect(teams.some((team) => team.name === key)).toBeTruthy();
    });
  });

  test("Every club name in typedData exists in the teams array", () => {
    Object.values(typedData).forEach((club) => {
      expect(teams.some((team) => team.name === club.name)).toBeTruthy();
    });
  });

  test("Each team has at least five players", () => {
    Object.values(typedData).forEach((team) => {
      expect(team.players.length).toBeGreaterThanOrEqual(5);
    });
  });

  test("Player names are non-empty strings", () => {
    Object.values(typedData).forEach((team) => {
      team.players.forEach((player) => {
        expect(typeof player.name).toBe("string");
        expect(player.name.trim()).not.toBe("");
      });
    });
  });

  test("No duplicate players within each team", () => {
    Object.entries(typedData).forEach(([teamName, team]) => {
      const playerSet = new Set();
      team.players.forEach((player) => {
        const playerKey = `${player.name}|${player.image_url}`;
        if (playerSet.has(playerKey)) {
          console.log(`Duplicate player found in team ${teamName}`);
          console.log(`Duplicate player: ${playerKey}`);
        }
        expect(playerSet.has(playerKey)).toBe(false);
        playerSet.add(playerKey);
      });
    });
  });

  test("Team name is not the same as its logo", () => {
    Object.entries(typedData).forEach(([teamName, team]) => {
      expect(teamName).not.toBe(team.logo);
    });
  });

  test("Team logos in typedData match those in teams array", () => {
    Object.entries(typedData).forEach(([teamName, team]) => {
      const matchingTeam = teams.find((t) => t.name === teamName);
      expect(matchingTeam).toBeDefined();
      if (matchingTeam) {
        expect(team.logo).toBe(matchingTeam.logo);
      }
    });
  });
});
