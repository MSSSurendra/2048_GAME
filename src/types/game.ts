export interface Tile {
  id: string;
  value: number;
  row: number;
  col: number;
  isNew?: boolean;
  isMerged?: boolean;
}

export interface GameState {
  board: (Tile | null)[][];
  score: number;
  bestScore: number;
  gameStatus: 'playing' | 'won' | 'lost';
  hasWon: boolean;
}

export type Direction = 'up' | 'down' | 'left' | 'right';