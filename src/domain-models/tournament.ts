export interface Tournament {
  id: string;
  created_at: string;
  name: string;
  game: string;
  format: string;
  start_date: string;
}

export interface Standings {
  id: number;
  created_at: string;
  position: number;
  tournament_id: string;
  player_id: string;
  deck_id: number;
  wins: number;
  losses: number;
  draws: number;
}
