// Import necessary dependencies and components
import { useState, useEffect } from "react";
import { PlayerBand } from "~/components/ui/players/player-band";
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";
import { setGame } from "~/lib/utils/index_utils";
import { TeamSelect } from "~/components/ui/teams/teamSelect";
import { GameState } from "~/types/gameStateTypes";
import { CorrectDialog } from "~/components/ui/info/daily/correctDialog";
import { IncorrectDialog } from "~/components/ui/info/daily/incorrectDialog";
import { getItem, setItem } from "~/lib/utils/local_storage_utils";
import { InfoHelp } from "~/components/ui/info/info";
import Confetti from "react-confetti";
import { Link } from "@remix-run/react";

// Define the main Index component
export default function Index() {
  // Initialize game state using useState hook
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isCorrectDialogOpen, setIsCorrectDialogOpen] = useState(false);
  const [isIncorrectDialogOpen, setIsIncorrectDialogOpen] = useState(false);
  const [daysInARow, setDaysInARow] = useState(0);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  // Use useEffect hook to initialize or load the game state
  useEffect(() => {
    const getCurrentDate = () => {
      const now = new Date();
      // Example returned value: new Date(2023, 5, 15) for June 15, 2023
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    };

    const formatDate = (date: Date) => {
      return date.toISOString().slice(0, 10);
      // Example: "2023-06-15" for June 15, 2023
    };

    const lastPlayedDate = getItem("lastPlayedDate", null);
    const currentDate = formatDate(getCurrentDate());
    const storedDaysInARow = getItem("daysInARow", 0);
    const storedCorrectStreak = getItem("correctStreak", 0);



    if (lastPlayedDate === currentDate) {
      // If the game was played today, load the saved game state
      const savedState = getItem("gameState", null);
      if (savedState) {
        setGameState(savedState);
      }
      setDaysInARow(storedDaysInARow || 0);
      setCorrectStreak(storedCorrectStreak || 0);
    } else {
      setItem("completedDaily", false)
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

      // Update days in a row
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
          // Missed some days, reset days in a row
          setDaysInARow(1);
          setItem("daysInARow", 1);
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
      setItem("completedDaily", true)
      newState.isAbleToGuess = false;
      newState.visibleCards = 5;
      setIsCorrectDialogOpen(true);
      const newCorrectStreak = correctStreak + 1;
      setCorrectStreak(newCorrectStreak);
      setItem("correctStreak", newCorrectStreak);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 5 seconds
    } else {
      // If the guess is incorrect
      newState.visibleCards = Math.min(newState.visibleCards + 1, 5);
      // Only set isAbleToGuess to false if this was the last possible guess
      if (newState.visibleCards === 5 && newState.attempts === 5) {
        newState.isAbleToGuess = false;
        setItem("completedDaily", true)
        setIsIncorrectDialogOpen(true);
        setCorrectStreak(0);
        setItem("correctStreak", 0);
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
    <div className="relative flex flex-col min-h-screen">
      {showConfetti && <Confetti />}
      <main className="flex-grow">
        <h1 className="sr-only">Connect 5 - Football Trivia Game</h1>
        <center>
          <h1 className="font-bold">
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h1>
        </center>
        {gameState.isAbleToGuess && (
          <section aria-label="Football Quiz Game">
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
          </section>
        )}
        {!gameState.isAbleToGuess && (
          <section aria-label="Football Trivia Results">
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
              <h2 className="px-6 py-2 mb-6 text-4xl font-bold text-gray-800">
                {gameState.teamName}
              </h2>
              <div className="flex flex-col space-y-4">
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
                <Link to="/infinite" className="flex justify-center">
                  <span className="text-2xl cursor-pointer hover:underline">
                    ∞
                  </span>
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
      <footer className="flex justify-center p-4 mt-auto">
        <InfoHelp />
      </footer>
      <CorrectDialog
        isOpen={isCorrectDialogOpen}
        onClose={() => setIsCorrectDialogOpen(false)}
        attempts={gameState.attempts}
        teamName={gameState.teamName}
        teamLogo={gameState.teamLogo}
        daysInARow={daysInARow}
        correctStreak={correctStreak}
      />
      <IncorrectDialog
        isOpen={isIncorrectDialogOpen}
        onClose={() => setIsIncorrectDialogOpen(false)}
        attempts={gameState.attempts}
        teamName={gameState.teamName}
        teamLogo={gameState.teamLogo}
        daysInARow={daysInARow}
        correctStreak={correctStreak}
      />
    </div>
  );
}
