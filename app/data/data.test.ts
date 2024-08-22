import { teams } from "./teams";

describe("Teams data is correct", () => {
  test("Teams array is nonempty", () => {
    expect(teams.length).toBeGreaterThan(0);
  });

  test("Teams array contains only strings", () => {
    teams.forEach((team) => {
      expect(typeof team).toBe("string");
    });
  });

  test("Teams array has no duplicate entries", () => {
    const uniqueTeams = new Set(teams);
    expect(uniqueTeams.size).toBe(teams.length);
  });

  test("Teams array contains expected teams", () => {
    const expectedTeams = [
      "Real Madrid CF",
      "FC Barcelona",
      "Manchester United",
      "Liverpool",
    ];
    expectedTeams.forEach((team) => {
      expect(teams).toContain(team);
    });
  });

  test("Teams array has no empty strings", () => {
    teams.forEach((team) => {
      expect(team.trim()).not.toBe("");
    });
  });

  test("Teams array is sorted alphabetically", () => {
    const sortedTeams = [...teams].sort((a, b) => a.localeCompare(b));
    expect(teams).toEqual(sortedTeams);
  });
});
