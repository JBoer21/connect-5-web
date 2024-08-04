interface Player {
  name: string;
  image: string;
  clubsPlayedFor: number;
}

interface Club {
  id: number;
  club: string;
  logo: string;
  players: Player[];
}
export interface ClubData {
  solutions: Club[];
}
