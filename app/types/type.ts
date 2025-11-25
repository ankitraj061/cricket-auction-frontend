export type Player = {
  id: number;
  name: string;
  role: string;
  basePrice: number;
  mobile?: string;
  description?: string;
  stats?: string;
  playerImageUrl?: string;
  isSold: boolean;
  teamId?: number | null;
  soldPrice?: number | null;
  createdAt?: string;
  updatedAt?: string;
};

export interface Team {
  id?: number;
  teamId?: number;
  name: string;
  captainName: string;
  captainImage?: string | null;
  totalPlayers: number;
  remainingPurse: number;
  currentPurse: number;
    players?: Player[];
}
