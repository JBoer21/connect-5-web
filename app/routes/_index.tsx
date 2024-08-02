import { Link, useLoaderData } from "@remix-run/react";
import { Waypoints } from "lucide-react";
import { ThemeToggle } from "./resources.theme-toggle";
import { Data, IndexLoaderData } from "~/types/playerTypes";
import data from "~/data/players.json";
import { PlayerBand } from "~/components/ui/players.tsx/player-band";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { teams } from "~/data/teams";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { useToast } from "~/components/ui/use-toast";
import { setGame } from "~/lib/utils/index_utils";

export const loader = async () => {
  return setGame();
};

export default function Index() {
  const { toast } = useToast();
  const { teamName, players } = useLoaderData<IndexLoaderData>();
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [isAbleToGuess, setAbleToGuess] = useState(true);

  const [guesses, setGuesses] = useState([]);

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
    setGuesses([...guesses, selectedTeam]);

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
    }
  };

  return (
    <div>
      <nav className="flex items-center justify-between w-full p-4">
        <Link to="/" className="flex items-center space-x-2">
          <Waypoints />
          <h1 className="text-xl font-semibold">Connect 5</h1>
        </Link>
        <ThemeToggle />
      </nav>

      <div className="px-4">
        <>
          <h2 className="mb-4 text-2xl font-bold text-center">
            Team: {teamName}
          </h2>
          <PlayerBand
            players={players.map((player) => ({
              name: player.short_name,
              imageUrl: player.player_image_url,
            }))}
            visible={visibleCards}
          />
        </>
      </div>

      {isAbleToGuess && (
        <div className="flex items-center justify-center p-6 space-x-4">
          <Select onValueChange={setSelectedTeam}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select a club" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {teams.map((team, index) => (
                  <SelectItem value={team} key={index}>
                    {team}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            onClick={handleSubmit}
            className="text-white bg-green-500 hover:bg-green-600"
          >
            Submit
          </Button>
        </div>
      )}
    </div>
  );
}
