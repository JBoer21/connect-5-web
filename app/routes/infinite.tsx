// infinite
import { json, LoaderFunction } from "@remix-run/node";
import { IndexLoaderData } from "~/types/playerTypes";
import { createRandomGameState } from "~/lib/utils/infinite_utils";
import { PlayerBand } from "~/components/ui/players/player-band";
import { useLoaderData } from "@remix-run/react";
import { TeamSelect } from "~/components/ui/teams/teamSelect";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { useToast } from "~/components/ui/use-toast";
import { CorrectDialog } from "~/components/ui/info/infinite/correctDialog";
import { IncorrectDialog } from "~/components/ui/info/infinite/incorrectDialog";
import { getItem } from "~/lib/utils/local_storage_utils";
import { InfoHelp } from "~/components/ui/info/info";
import { Link } from "@remix-run/react";

export const loader: LoaderFunction = async () => {
  const gameState: IndexLoaderData = createRandomGameState();
  return json(gameState);
};

export default function TestRoute() {
  const { toast } = useToast();
  const gameState = useLoaderData<IndexLoaderData>();

  const completedDaily = getItem("completedDaily", null);

  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [incorrectGuesses, setIncorrectGuesses] = useState<string[]>([]);
  const [attempts, setAttempts] = useState(1);
  const [attemptsToCorrect, setAttemptsToCorrect] = useState(1);
  const [isAbleToGuess, setIsAbleToGuess] = useState(true);

  const [isCorrectDialogOpen, setIsCorrectDialogOpen] = useState(false);
  const [isIncorrectDialogOpen, setIsIncorrectDialogOpen] = useState(false);

  const handleSubmit = () => {
    if (selectedTeam === gameState.teamName) {
      setIsCorrectDialogOpen(true);
      setAttemptsToCorrect(attempts);
      setAttempts(5);
      setIsAbleToGuess(false);
    } else {
      setIncorrectGuesses([...incorrectGuesses, selectedTeam]);
      setAttempts(attempts + 1);
      toast({
        title: "Incorrect guess",
        description: "Try again!",
        variant: "destructive",
      });
      if (attempts >= 5) {
        setIsIncorrectDialogOpen(true);
        setIsAbleToGuess(false);
      }
    }
  };

  return completedDaily ? (
    <div className="relative flex flex-col min-h-screen">
      <center>
        <h1>∞</h1>
      </center>
      <main className="flex-grow">
        {isAbleToGuess && (
          <>
            <PlayerBand
              players={gameState.players.map((player) => ({
                name: player.name,
                imageUrl: player.image_url,
              }))}
              visible={attempts}
            />
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
          </>
        )}
        {!isAbleToGuess && (
          <>
            <PlayerBand
              players={gameState.players.map((player) => ({
                name: player.name,
                imageUrl: player.image_url,
              }))}
              visible={5}
            />
            <h2 className="px-6 py-2 mb-6 text-4xl font-bold text-center text-gray-800">
              {gameState.teamName}
            </h2>
            <div className="flex justify-center">
              <Button
                onClick={() =>
                  attempts === 5
                    ? setIsIncorrectDialogOpen(true)
                    : setIsCorrectDialogOpen(true)
                }
                className="text-white bg-blue-500 hover:bg-blue-600"
              >
                View Results
              </Button>
            </div>
          </>
        )}
      </main>
      <footer className="flex justify-center p-4 mt-auto">
        <InfoHelp />
      </footer>
      <CorrectDialog
        isOpen={isCorrectDialogOpen}
        onClose={() => setIsCorrectDialogOpen(false)}
        attempts={attemptsToCorrect}
        teamName={gameState.teamName}
        teamLogo={gameState.teamLogo}
        onPlayAgain={() => window.location.reload()}
      />
      <IncorrectDialog
        isOpen={isIncorrectDialogOpen}
        onClose={() => setIsIncorrectDialogOpen(false)}
        teamName={gameState.teamName}
        teamLogo={gameState.teamLogo}
        onPlayAgain={() => window.location.reload()}
      />
    </div>
  ) : (
    <div className="flex flex-col items-center justify-start h-screen">
      <h2 className="mt-4 text-xl font-bold text-center text-gray-800">
        Finish the{" "}
        <Link to="/" className="underline hover:text-gray-500">
          daily game
        </Link>{" "}
        before playing the ∞ version.
      </h2>
      <img
        src="https://www.telegraph.co.uk/content/dam/football/2024/03/11/TELEMMGLPICT000370269839_17101966662100_trans_NvBQzQNjv4BqBt9H6QkwRG1YayaFxZfhyKZ_LJP60i4SCm85aMwp6TY.jpeg?imwidth=680"
        alt="Football"
        className="mt-4 rounded-lg shadow-lg"
      />
    </div>
  );
}
