import { MockPlayerCard } from "./mock-player-card";

interface Player {
  name: string;
  imageUrl: string;
}

interface MockPlayerBandProps {
  players: Player[];
}

export function MockPlayerBand({ players }: MockPlayerBandProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4 overflow-x-auto sm:flex-row">
      {players.slice(0, 5).map((player, index) => (
        <MockPlayerCard
          key={index}
          name={player.name}
          imageUrl={player.imageUrl}
        />
      ))}
    </div>
  );
}
