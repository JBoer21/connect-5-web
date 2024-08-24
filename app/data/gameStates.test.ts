import gameStates from "./game_states.json";

describe("Game States", () => {
  test("Each state has exactly 5 players", () => {
    gameStates.forEach((gameState) => {
      expect(gameState.state.players).toBeDefined();
      expect(Array.isArray(gameState.state.players)).toBe(true);
      expect(gameState.state.players.length).toBe(5);
    });
  });

  test("No two states are the same", () => {
    const stateSet = new Set();
    gameStates.forEach((gameState) => {
      const stateString = JSON.stringify(gameState.state);
      expect(stateSet.has(stateString)).toBe(false);
      stateSet.add(stateString);
    });
  });

  test("No team is used twice in a row", () => {
    let previousTeam = "";
    gameStates.forEach((gameState, index) => {
      const currentTeam = gameState.state.teamName;
      if (index > 0) {
        expect(currentTeam).not.toBe(previousTeam);
      }
      previousTeam = currentTeam;
    });
  });

  test("No team is used twice within 3 states of each other", () => {
    const recentTeams: string[] = [];
    gameStates.forEach((gameState) => {
      const currentTeam = gameState.state.teamName;

      // Check if the current team is in the last 3 teams
      expect(recentTeams.includes(currentTeam)).toBe(false);

      // Add the current team to the recent teams
      recentTeams.unshift(currentTeam);

      // Keep only the last 3 teams
      if (recentTeams.length > 3) {
        recentTeams.pop();
      }
    });
  });
});
