import { getGameStateForDate } from "./index_utils";

jest.mock("@remix-run/node", () => ({
  json: jest.fn(),
}));

describe("getGameStateForDate", () => {
  test("returns correct game state for a given date", () => {
    const testDate = new Date("2024-08-24");
    expect(getGameStateForDate(testDate)).toBe(1);
  });

  test("returns incremented game state for each day after base date", () => {
    const baseDate = new Date("2024-08-24");
    const nextDay = new Date("2024-08-25");
    const tenDaysLater = new Date("2024-09-03");

    expect(getGameStateForDate(baseDate)).toBe(1);
    expect(getGameStateForDate(nextDay)).toBe(2);
    expect(getGameStateForDate(tenDaysLater)).toBe(11);
  });

  test("handles dates before the base date", () => {
    const earlierDate = new Date("2024-08-23");
    expect(getGameStateForDate(earlierDate)).toBe(0);
  });

  test("handles leap years correctly", () => {
    const leapYearDate = new Date("2024-09-24"); // 31 days after base date
    expect(getGameStateForDate(leapYearDate)).toBe(32);
  });

  test("returns consistent results for the same date", () => {
    const testDate = new Date("2025-01-01");
    const result1 = getGameStateForDate(testDate);
    const result2 = getGameStateForDate(testDate);
    expect(result1).toBe(result2);
  });
});
