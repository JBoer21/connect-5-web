import { PlayerCard } from "./player-card";

interface Player {
  name: string;
  imageUrl: string;
}

interface PlayerBandProps {
  players: Player[];
  visible: number;
}

export function PlayerBand({ players, visible }: PlayerBandProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4 overflow-x-auto sm:flex-row">
      {players.slice(0, 5).map((player, index) => (
        <PlayerCard
          key={index}
          name={player.name}
          imageUrl={player.imageUrl}
          show={index < visible}
        />
      ))}
    </div>
  );
}
