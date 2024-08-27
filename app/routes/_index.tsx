// Import necessary dependencies and components
import { useState, useEffect } from "react";
import { PlayerBand } from "~/components/ui/players/player-band";
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";
import { setGame } from "~/lib/utils/index_utils";
import { TeamSelect } from "~/components/ui/teamss/teamSelect";
import { GameState } from "~/types/gameStateTypes";
import { CorrectDialog } from "~/components/ui/info/correctDialog";
import { IncorrectDialog } from "~/components/ui/info/incorrectDialog";
import {
  getItem,
  setItem,
  clearStorage,
} from "~/lib/utils/local_storage_utils";
import { InfoHelp } from "~/components/ui/info/info";

// Define the main Index component
export default function Index() {
  // Initialize game state using useState hook
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isCorrectDialogOpen, setIsCorrectDialogOpen] = useState(false);
  const [isIncorrectDialogOpen, setIsIncorrectDialogOpen] = useState(false);
  const [daysInARow, setDaysInARow] = useState(0);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [incorrectDays, setIncorrectDays] = useState(0);
  const [notPlayedDays, setNotPlayedDays] = useState(0);
  const [attemptsDistribution, setAttemptsDistribution] = useState<{
    [key: number]: number;
  }>({});

  // Use useEffect hook to initialize or load the game state
  useEffect(() => {
    const lastPlayedDate = getItem("lastPlayedDate", null);
    const currentDate = new Date().toDateString();
    const storedDaysInARow = getItem("daysInARow", 0);
    const storedCorrectStreak = getItem("correctStreak", 0);
    const storedIncorrectDays = getItem("incorrectDays", 0);
    const storedNotPlayedDays = getItem("notPlayedDays", 0);
    const storedAttemptsDistribution = getItem("attemptsDistribution", {});

    if (lastPlayedDate === currentDate) {
      // If the game was played today, load the saved game state
      const savedState = getItem("gameState", null);
      if (savedState) {
        setGameState(savedState);
      }
      setDaysInARow(storedDaysInARow || 0);
      setCorrectStreak(storedCorrectStreak || 0);
      setIncorrectDays(storedIncorrectDays || 0);
      setNotPlayedDays(storedNotPlayedDays || 0);
      setAttemptsDistribution(storedAttemptsDistribution || {});
    } else {
      // If it's a new day, set up a new game
      const newGameState: GameState = {
        ...setGame(),
        attempts: 0,
        visibleCards: 1,
        incorrectGuesses: [],
        isAbleToGuess: true,
      };
      setGameState(newGameState);
      setItem("lastPlayedDate", currentDate);
      setItem("gameState", newGameState);

      // Update days in a row and not played days
      if (lastPlayedDate) {
        const lastPlayedDateTime = new Date(lastPlayedDate).getTime();
        const currentDateTime = new Date(currentDate).getTime();
        const daysDifference = Math.floor(
          (currentDateTime - lastPlayedDateTime) / (1000 * 60 * 60 * 24),
        );

        if (daysDifference === 1) {
          // Played yesterday, increment days in a row
          const newDaysInARow = (storedDaysInARow || 0) + 1;
          setDaysInARow(newDaysInARow);
          setItem("daysInARow", newDaysInARow);
        } else if (daysDifference > 1) {
          // Missed some days, reset days in a row and update not played days
          setDaysInARow(1);
          setItem("daysInARow", 1);
          const newNotPlayedDays =
            (storedNotPlayedDays || 0) + daysDifference - 1;
          setNotPlayedDays(newNotPlayedDays);
          setItem("notPlayedDays", newNotPlayedDays);
        }
      } else {
        // First time playing, set days in a row to 1
        setDaysInARow(1);
        setItem("daysInARow", 1);
      }

      // Reset correct streak for a new day
      setCorrectStreak(0);
      setItem("correctStreak", 0);
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
      newState.isAbleToGuess = false;
      newState.visibleCards = 5;
      setIsCorrectDialogOpen(true);
      const newCorrectStreak = correctStreak + 1;
      setCorrectStreak(newCorrectStreak);
      setItem("correctStreak", newCorrectStreak);

      // Update attempts distribution
      const newAttemptsDistribution = { ...attemptsDistribution };
      newAttemptsDistribution[newState.attempts] =
        (newAttemptsDistribution[newState.attempts] || 0) + 1;
      setAttemptsDistribution(newAttemptsDistribution);
      setItem("attemptsDistribution", newAttemptsDistribution);
    } else {
      // If the guess is incorrect
      newState.visibleCards = Math.min(newState.visibleCards + 1, 5);
      // Only set isAbleToGuess to false if this was the last possible guess
      if (newState.visibleCards === 5 && newState.attempts === 5) {
        newState.isAbleToGuess = false;
        setIsIncorrectDialogOpen(true);
        setCorrectStreak(0);
        setItem("correctStreak", 0);
        const newIncorrectDays = incorrectDays + 1;
        setIncorrectDays(newIncorrectDays);
        setItem("incorrectDays", newIncorrectDays);
      } else {
        // Show toast only if it's not the last guess
        toast({
          title: "Incorrect guess",
          description: "Try again!",
          variant: "destructive",
        });
      }
      newState.incorrectGuesses = [...newState.incorrectGuesses, selectedTeam];
    }

    // Update game state and save to localStorage
    setGameState(newState);
    setItem("gameState", newState);
  };

  // Function to clear localStorage
  const clearLocalStorage = () => {
    clearStorage();
    // Reset the game state
    setGameState(null);
    setDaysInARow(0);
    setCorrectStreak(0);
    setIncorrectDays(0);
    setNotPlayedDays(0);
    setAttemptsDistribution({});
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
    <div className="relative min-h-screen">
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
          <div className="flex flex-col items-center justify-center p-4">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
              {gameState.teamName}
            </h2>
            <Button
              onClick={() =>
                gameState.attempts === 5
                  ? setIsIncorrectDialogOpen(true)
                  : setIsCorrectDialogOpen(true)
              }
              className="text-white bg-blue-500 hover:bg-blue-600"
            >
              View Results
            </Button>
          </div>
        </div>
      )}
      <CorrectDialog
        isOpen={isCorrectDialogOpen}
        onClose={() => setIsCorrectDialogOpen(false)}
        attempts={gameState.attempts}
        teamName={gameState.teamName}
        teamLogo={gameState.teamLogo}
        daysInARow={daysInARow}
        correctStreak={correctStreak}
        incorrectDays={incorrectDays}
        notPlayedDays={notPlayedDays}
        attemptsDistribution={attemptsDistribution}
      />
      <IncorrectDialog
        isOpen={isIncorrectDialogOpen}
        onClose={() => setIsIncorrectDialogOpen(false)}
        attempts={gameState.attempts}
        teamName={gameState.teamName}
        teamLogo={gameState.teamLogo}
        daysInARow={daysInARow}
        correctStreak={correctStreak}
        incorrectDays={incorrectDays}
        notPlayedDays={notPlayedDays}
        attemptsDistribution={attemptsDistribution}
      />
      {/* Clear localStorage button for development testing */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 right-4">
          <Button
            onClick={clearLocalStorage}
            className="text-white bg-red-500 hover:bg-red-600"
          >
            Clear localStorage (Dev Only)
          </Button>
        </div>
      )}
      {/* InfoHelp component added to the bottom left corner */}
      <div className="fixed bottom-4 left-4">
        <InfoHelp />
      </div>
    </div>
  );
}
