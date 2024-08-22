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
});
