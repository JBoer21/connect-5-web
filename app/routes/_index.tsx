// Import necessary dependencies and components
import { useState, useEffect } from "react";
import { PlayerBand } from "~/components/ui/players/player-band";
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";
import { setGame } from "~/lib/utils/index_utils";
import { TeamSelect } from "~/components/ui/teamss/teamSelect";
import { GameState } from "~/types/gameStateTypes";

// Define the main Index component
export default function Index() {
  // Initialize game state using useState hook
  const [gameState, setGameState] = useState<GameState | null>(null);

  // Use useEffect hook to initialize or load the game state
  useEffect(() => {
    const lastPlayedDate = localStorage.getItem("lastPlayedDate");
    const currentDate = new Date().toDateString();

    if (lastPlayedDate === currentDate) {
      // If the game was played today, load the saved game state
      const savedState = localStorage.getItem("gameState");
      if (savedState) {
        setGameState(JSON.parse(savedState));
      }
    } else {
      // If it's a new day, set up a new game
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
  }, []); // Empty dependency array means this effect runs once on mount

  // Initialize toast functionality and selected team state
  const { toast } = useToast();
  const [selectedTeam, setSelectedTeam] = useState<string>("");

  // Handle submit function for when a guess is made
  const handleSubmit = () => {
    if (!gameState || !selectedTeam) return;

    const newState = { ...gameState };
    newState.attempts += 1;

    if (selectedTeam === gameState.teamName) {
      // If the guess is correct
      toast({
        title: "Correct",
        description: `You answered correctly in ${newState.attempts} tries!`,
        variant: "default",
      });
      newState.isAbleToGuess = false;
      newState.visibleCards = 5;
    } else {
      // If the guess is incorrect
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

    // Update game state and save to localStorage
    setGameState(newState);
    localStorage.setItem("gameState", JSON.stringify(newState));
  };

  // Show loading spinner if game state is not yet initialized
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

  // Render the main game interface
  return (
    <div>
      {gameState.isAbleToGuess && (
        // Render game interface when player can still guess
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
        // Render game result when player can no longer guess
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
