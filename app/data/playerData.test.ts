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
      expect(teams).toContain(key);
    });
  });

  test("Every club name in typedData exists in the teams array", () => {
    Object.values(typedData).forEach((club) => {
      expect(teams).toContain(club.name);
    });
  });

  test("Each team has at least one player", () => {
    Object.values(typedData).forEach((team) => {
      expect(team.players.length).toBeGreaterThan(0);
    });
  });

  test("Each team has at least five playes", () => {
    Object.values(typedData).forEach((team) => {
      expect(team.players.length).toBeGreaterThan(4);
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

  test("No duplicate player names within a team", () => {
    Object.values(typedData).forEach((team) => {
      const playerNames = team.players.map(player => player.name);
      const uniqueNames = new Set(playerNames);
      expect(playerNames.length).toBe(uniqueNames.size);
    });
  });

    
});
