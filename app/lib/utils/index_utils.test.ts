import { getGameStateForDate } from "./index_utils";

jest.mock("@remix-run/node", () => ({
  json: jest.fn(),
}));

describe("getGameStateForDate", () => {
  test("returns correct game state for the base date", () => {
    const baseDate = new Date("2024-08-31");
    expect(getGameStateForDate(baseDate)).toBe(1);
  });

  test("returns incremented game state for each day after base date", () => {
    const baseDate = new Date("2024-08-31");
    const nextDay = new Date("2024-09-01");
    const tenDaysLater = new Date("2024-09-10");

    expect(getGameStateForDate(baseDate)).toBe(1);
    expect(getGameStateForDate(nextDay)).toBe(2);
    expect(getGameStateForDate(tenDaysLater)).toBe(11);
  });

  test("handles dates before the base date", () => {
    const earlierDate = new Date("2024-08-30");
    expect(getGameStateForDate(earlierDate)).toBe(0);
  });

  test("handles year change correctly", () => {
    const baseDate = new Date("2024-08-31");
    const yearChangeDate = new Date("2025-01-01");
    const daysDifference = Math.floor(
      (yearChangeDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    expect(getGameStateForDate(yearChangeDate)).toBe(daysDifference + 1);
  });

  test("returns consistent results for the same date", () => {
    const testDate = new Date("2025-03-15");
    const result1 = getGameStateForDate(testDate);
    const result2 = getGameStateForDate(testDate);
    expect(result1).toBe(result2);
  });
});
