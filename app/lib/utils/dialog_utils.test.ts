import { getHighResLogo } from "./dialog_utils";

describe("getHighResLogo", () => {
  test("converts 60.png to 240.png at the end of the URL", () => {
    const input = "https://example.com/logo60.png";
    const expected = "https://example.com/logo240.png";
    expect(getHighResLogo(input)).toBe(expected);
  });
});
