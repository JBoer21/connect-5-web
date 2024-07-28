import { PlayerCard } from "./player-card";

interface Player {
  name: string;
  imageUrl: string;
}

interface PlayerRowProps {
  players: Player[];
}

export function PlayerBand({ players }: PlayerRowProps) {
  return (
    <div className="flex items-center justify-center gap-2 p-4 overflow-x-auto">
      {players.slice(0, 5).map((player, index) => (
        <PlayerCard key={index} name={player.name} imageUrl={player.imageUrl} />
      ))}
    </div>
  );
}
