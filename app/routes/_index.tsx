import { useLoaderData } from "@remix-run/react";
import { IndexLoaderData } from "~/types/playerTypes";
import { PlayerBand } from "~/components/ui/players/player-band";
import { Button } from "~/components/ui/button";
import { useEffect, useState } from "react";
import { useToast } from "~/components/ui/use-toast";
import { setGame } from "~/lib/utils/index_utils";
import { TeamSelect } from "~/components/ui/teamss/teamSelect";
import { Header } from "~/components/ui/info/header";

export const loader = async () => {
  return setGame();
};

export default function Index() {
  const [hasPlayedToday, setHasPlayedToday] = useState(false);

  useEffect(() => {
    const lastPlayedDate = localStorage.getItem("lastPlayedDate");
    const currentDate = new Date().toDateString();

    if (lastPlayedDate === currentDate) {
      setHasPlayedToday(true);
    } else {
      localStorage.setItem("lastPlayedDate", currentDate);
    }
  }, []);

  const { toast } = useToast();
  const { teamName, players } = useLoaderData<IndexLoaderData>();
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [isAbleToGuess, setAbleToGuess] = useState(true);

  const [incorrectGuesses, setIncorrectGuesses] = useState<string[]>([]);

  const [attempts, setAttempts] = useState(1);

  const [visibleCards, setVisibleCards] = useState(1);

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
      <Header />

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
      {!isAbleToGuess && <div className="flex justify-center">{teamName}</div>}
    </div>
  );
}
