import { useState, useEffect } from "react";
import { PlayerBand } from "~/components/ui/players/player-band";
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";
import { setGame } from "~/lib/utils/index_utils";
import { TeamSelect } from "~/components/ui/teamss/teamSelect";
import { GameState } from "~/types/gameStateTypes";

export default function Index() {
  const [gameState, setGameState] = useState<GameState | null>(null);

  useEffect(() => {
    const lastPlayedDate = localStorage.getItem("lastPlayedDate");
    const currentDate = new Date().toDateString();

    if (lastPlayedDate === currentDate) {
      // Load saved game state
      const savedState = localStorage.getItem("gameState");
      if (savedState) {
        setGameState(JSON.parse(savedState));
      }
    } else {
      // Set a new game
      const newGameState: GameState = {
        ...setGame(),
        attempts: 1,
        visibleCards: 1,
        incorrectGuesses: [],
        isAbleToGuess: true,
      };
      setGameState(newGameState);
      localStorage.setItem("lastPlayedDate", currentDate);
      localStorage.setItem("gameState", JSON.stringify(newGameState));
    }
  }, []);

  const { toast } = useToast();
  const [selectedTeam, setSelectedTeam] = useState<string>("");

  const handleSubmit = () => {
    if (!gameState || !selectedTeam) return;

    const newState = { ...gameState };
    newState.attempts += 1;

    if (selectedTeam === gameState.teamName) {
      toast({
        title: "Correct",
        description: `You answered correctly in ${newState.attempts} tries!`,
        variant: "default",
      });
      newState.isAbleToGuess = false;
      newState.visibleCards = 5;
    } else {
      toast({
        title: "Incorrect guess",
        description: "Try again!",
        variant: "destructive",
      });
      newState.visibleCards = Math.min(newState.visibleCards + 1, 5);
      if (newState.visibleCards === 5) {
        newState.isAbleToGuess = false;
      }
      newState.incorrectGuesses = [...newState.incorrectGuesses, selectedTeam];
    }

    setGameState(newState);
    localStorage.setItem("gameState", JSON.stringify(newState));
  };

  // Only proceed with the game logic if we have a game state
  if (!gameState) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex space-x-2">
          <div className="w-4 h-4 bg-gray-900 rounded-full animate-pulse"></div>
          <div className="w-4 h-4 delay-75 bg-gray-900 rounded-full animate-pulse"></div>
          <div className="w-4 h-4 delay-150 bg-gray-900 rounded-full animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {gameState.isAbleToGuess && (
        <div>
          <div className="px-4">
            <PlayerBand
              players={gameState.players.map((player) => ({
                name: player.name,
                imageUrl: player.image_url,
              }))}
              visible={gameState.visibleCards}
            />
          </div>
          <div className="flex items-center justify-center p-6 space-x-4">
            <TeamSelect
              onValueChange={setSelectedTeam}
              incorrectGuesses={gameState.incorrectGuesses}
            />
            <Button
              onClick={handleSubmit}
              className="text-white bg-green-500 hover:bg-green-600"
            >
              Submit
            </Button>
          </div>
        </div>
      )}
      {!gameState.isAbleToGuess && (
        <div>
          <div className="px-4">
            <PlayerBand
              players={gameState.players.map((player) => ({
                name: player.name,
                imageUrl: player.image_url,
              }))}
              visible={gameState.players.length}
            />
          </div>
          <div className="flex justify-center">{gameState.teamName}</div>
        </div>
      )}
    </div>
  );
}
