export interface Player {
  id: number;
  long_name: string;
  short_name: string;
  overall: number;
  player_image_url: string;
  num_clubs: number;
}

export interface Team {
  name: string;
  players: Player[];
}

export interface Data {
  [teamName: string]: Team;
}

export interface IndexLoaderData {
  teamName: string;
  players: Array<{
    short_name: string;
    player_image_url: string;
    num_clubs: number;
  }>;
}

