import { getGameStateForDate } from "./index_utils";

describe("getGameStateForDate", () => {
  test("returns correct game state for the base date", () => {
    const baseDate = new Date(2024, 7, 31); // Month is 0-indexed, so 7 is August
    expect(getGameStateForDate(baseDate)).toBe(1);
  });

  test("returns incremented game state for each day after base date", () => {
    const baseDate = new Date(2024, 7, 31);
    const nextDay = new Date(2024, 8, 1);
    const tenDaysLater = new Date(2024, 8, 10);

    expect(getGameStateForDate(baseDate)).toBe(1);
    expect(getGameStateForDate(nextDay)).toBe(2);
    expect(getGameStateForDate(tenDaysLater)).toBe(11);
  });

  test("handles dates before the base date", () => {
    const earlierDate = new Date(2024, 7, 30);
    expect(getGameStateForDate(earlierDate)).toBe(0);
  });

  test("handles year change correctly", () => {
    const baseDate = new Date(2024, 7, 31);
    const yearChangeDate = new Date(2025, 0, 1);
    const daysDifference = Math.floor(
      (yearChangeDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    expect(getGameStateForDate(yearChangeDate)).toBe(daysDifference + 1);
  });

  test("returns consistent results for the same date", () => {
    const testDate = new Date(2025, 2, 15);
    const result1 = getGameStateForDate(testDate);
    const result2 = getGameStateForDate(testDate);
    expect(result1).toBe(result2);
  });

  test("returns consistent results for different times on the same day", () => {
    const baseDate = new Date(2025, 5, 15); // June 15, 2025
    const expectedGameState = getGameStateForDate(baseDate);

    const times = [
      new Date(2025, 5, 15, 0, 0, 0), // Midnight
      new Date(2025, 5, 15, 5, 30, 0), // 5:30 AM
      new Date(2025, 5, 15, 11, 45, 30), // 11:45:30 AM
      new Date(2025, 5, 15, 16, 20, 0), // 4:20 PM
      new Date(2025, 5, 15, 23, 59, 59), // 11:59:59 PM
    ];

    times.forEach((time) => {
      expect(getGameStateForDate(time)).toBe(expectedGameState);
    });
  });
});
