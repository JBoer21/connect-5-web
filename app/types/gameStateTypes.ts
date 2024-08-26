import { IndexLoaderData } from "./playerTypes";

export interface GameState extends IndexLoaderData {
  attempts: number;
  visibleCards: number;
  incorrectGuesses: string[];
  isAbleToGuess: boolean;
}
