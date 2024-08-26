import { teams } from "./teams";

describe("Teams data is correct", () => {
  test("Teams array is nonempty", () => {
    expect(teams.length).toBeGreaterThan(0);
  });

  test("Teams array contains only Team objects", () => {
    teams.forEach((team) => {
      expect(team).toHaveProperty("name");
      expect(team).toHaveProperty("logo");
    });
  });

  test("Teams array has no duplicate entries", () => {
    const uniqueTeamNames = new Set(teams.map((team) => team.name));
    expect(uniqueTeamNames.size).toBe(teams.length);
  });

  test("Teams array contains expected teams", () => {
    const expectedTeams = [
      "Real Madrid CF",
      "FC Barcelona",
      "Manchester United",
      "Liverpool",
    ];
    expectedTeams.forEach((teamName) => {
      expect(teams.some((team) => team.name === teamName)).toBeTruthy();
    });
  });

  test("Teams array has no empty team names", () => {
    teams.forEach((team) => {
      expect(team.name.trim()).not.toBe("");
    });
  });

  test("Teams array is sorted alphabetically by team name", () => {
    const sortedTeams = [...teams].sort((a, b) => a.name.localeCompare(b.name));
    expect(teams).toEqual(sortedTeams);
  });

  test("All team logos are valid URLs", () => {
    teams.forEach((team) => {
      expect(team.logo).toMatch(/^https?:\/\/.+/);
    });
  });

  test("Team names are unique", () => {
    const teamNames = teams.map((team) => team.name);
    const uniqueTeamNames = new Set(teamNames);
    expect(uniqueTeamNames.size).toBe(teamNames.length);
  });
});
