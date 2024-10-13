import { createRandomGameState } from "./infinite_utils";

describe("createRandomGameState", () => {
  it("should log the result of createRandomGameState", () => {
    const result = createRandomGameState();
    console.log(result);
  });
});
