export interface Player {
  name: string;
  image_url: string;
  num_clubs: number;
}

export interface Club {
  name: string;
  logo: string;
  players: Player[];
}

export interface ClubData {
  [teamName: string]: Club;
}

export interface IndexLoaderData {
  teamName: string;
  teamLogo: string;
  players: Array<{
    name: string;
    image_url: string;
    num_clubs: number;
  }>;
}
