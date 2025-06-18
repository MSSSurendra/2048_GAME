import React from 'react';
import { Tile as TileType } from '../types/game';
import { Tile } from './Tile';

interface GameBoardProps {
  board: (TileType | null)[][];
}

export const GameBoard: React.FC<GameBoardProps> = ({ board }) => {
  return (
    <div className="relative bg-gradient-to-br from-amber-100 to-orange-100 p-2 sm:p-3 rounded-2xl shadow-2xl border border-amber-200 touch-none select-none">
      {/* Grid background */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3 w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
        {Array.from({ length: 16 }).map((_, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-amber-200/50 to-orange-200/50 rounded-lg border border-amber-300/30 flex items-center justify-center"
          />
        ))}
      </div>
      
      {/* Tiles */}
      <div className="absolute inset-2 sm:inset-3 pointer-events-none">
        {board.flat().map((tile) => 
          tile ? <Tile key={tile.id} tile={tile} /> : null
        )}
      </div>
    </div>
  );
};