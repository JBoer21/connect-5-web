import { useState, useEffect } from "react";
import { PlayerBand } from "~/components/ui/players/player-band";
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";
import { setGame } from "~/lib/utils/index_utils";
import { TeamSelect } from "~/components/ui/teamss/teamSelect";
import { IndexLoaderData } from "~/types/playerTypes";

// Remove the loader function as we'll set the game state in the component

export default function Index() {
  const [hasPlayedToday, setHasPlayedToday] = useState(false);
  const [gameState, setGameState] = useState<IndexLoaderData | null>(null);

  useEffect(() => {
    const lastPlayedDate = localStorage.getItem("lastPlayedDate");
    const currentDate = new Date().toDateString();

    if (lastPlayedDate === currentDate) {
      setHasPlayedToday(true);
      // If the user has played today, we'll load their saved game state here in the future
    } else {
      // If the user hasn't played today, set a new game
      const newGameState = setGame();
      setGameState(newGameState as IndexLoaderData);
      localStorage.setItem("lastPlayedDate", currentDate);
    }
  }, []);

  const { toast } = useToast();
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [isAbleToGuess, setAbleToGuess] = useState(true);

  const [incorrectGuesses, setIncorrectGuesses] = useState<string[]>([]);

  const [attempts, setAttempts] = useState(1);

  const [visibleCards, setVisibleCards] = useState(1);

  // Only proceed with the game logic if we have a game state
  if (!gameState) {
    return <div>Loading...</div>;
  }

  const { teamName, players } = gameState;

  const handleSubmit = () => {
    if (!selectedTeam || selectedTeam === "") {
      toast({
        title: "Uh oh",
        description: "Please make sure to choose a team!",
        variant: "destructive",
      });
      return;
    }

    setAttempts(attempts + 1);

    if (selectedTeam === teamName) {
      toast({
        title: "Correct",
        description: `You answered correctly in ${attempts} tries!`,
        variant: "default",
      });
      setAbleToGuess(false);
      setVisibleCards(5);
    } else {
      toast({
        title: "Incorrect guess",
        description: "Try again!",
        variant: "destructive",
      });
      setVisibleCards(Math.min(visibleCards + 1, 5));
      if (visibleCards === 5) {
        setAbleToGuess(false);
      }
      setIncorrectGuesses([...incorrectGuesses, selectedTeam]);
    }
  };

  return (
    <div>
      {isAbleToGuess && (
        <div>
          <div className="px-4">
            <PlayerBand
              players={players.map((player) => ({
                name: player.name,
                imageUrl: player.image_url,
              }))}
              visible={visibleCards}
            />
          </div>
          <div className="flex items-center justify-center p-6 space-x-4">
            <TeamSelect
              onValueChange={setSelectedTeam}
              incorrectGuesses={incorrectGuesses}
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
      {!isAbleToGuess && (
        <div>
          <div className="px-4">
            <PlayerBand
              players={players.map((player) => ({
                name: player.name,
                imageUrl: player.image_url,
              }))}
              visible={players.length}
            />
          </div>
          <div className="flex justify-center">{teamName}</div>
        </div>
      )}
    </div>
  );
}
