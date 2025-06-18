import React from 'react';
import { Tile as TileType } from '../types/game';

interface TileProps {
  tile: TileType;
}

const getTileStyles = (value: number) => {
  const styles = {
    2: 'bg-gradient-to-br from-slate-100 to-slate-200 text-slate-800 border-slate-300',
    4: 'bg-gradient-to-br from-slate-200 to-slate-300 text-slate-800 border-slate-400',
    8: 'bg-gradient-to-br from-orange-300 to-orange-400 text-white border-orange-500',
    16: 'bg-gradient-to-br from-orange-400 to-orange-500 text-white border-orange-600',
    32: 'bg-gradient-to-br from-red-400 to-red-500 text-white border-red-600',
    64: 'bg-gradient-to-br from-red-500 to-red-600 text-white border-red-700',
    128: 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-white border-yellow-600',
    256: 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-yellow-700',
    512: 'bg-gradient-to-br from-purple-400 to-purple-500 text-white border-purple-600',
    1024: 'bg-gradient-to-br from-purple-500 to-purple-600 text-white border-purple-700',
    2048: 'bg-gradient-to-br from-pink-500 to-pink-600 text-white border-pink-700 shadow-pink-400/50',
  };
  
  return styles[value as keyof typeof styles] || 'bg-gradient-to-br from-gray-800 to-gray-900 text-white border-gray-700';
};

const getFontSize = (value: number) => {
  if (value < 100) return 'text-xl sm:text-2xl md:text-3xl lg:text-4xl';
  if (value < 1000) return 'text-lg sm:text-xl md:text-2xl lg:text-3xl';
  return 'text-base sm:text-lg md:text-xl lg:text-2xl';
};

export const Tile: React.FC<TileProps> = ({ tile }) => {
  const tileStyles = getTileStyles(tile.value);
  const fontSize = getFontSize(tile.value);
  
  // Calculate position based on screen size
  const getMobilePosition = () => ({
    left: `${tile.col * (64 + 8)}px`, // 64px tile + 8px gap
    top: `${tile.row * (64 + 8)}px`,
  });
  
  const getDesktopPosition = () => ({
    left: `${tile.col * (80 + 12)}px`, // 80px tile + 12px gap  
    top: `${tile.row * (80 + 12)}px`,
  });
  
  return (
    <>
      {/* Mobile tile */}
      <div
        className={`
          absolute sm:hidden w-16 h-16 rounded-lg border-2 
          flex items-center justify-center font-bold transition-all duration-200 ease-in-out
          ${tileStyles} ${fontSize}
          ${tile.isNew ? 'animate-pulse scale-110' : ''}
          ${tile.isMerged ? 'animate-bounce' : ''}
          shadow-lg active:scale-95
        `}
        style={getMobilePosition()}
      >
        <span className="text-center leading-none">{tile.value}</span>
      </div>
      
      {/* Desktop tile */}
      <div
        className={`
          absolute hidden sm:flex w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg border-2 
          items-center justify-center font-bold transition-all duration-200 ease-in-out
          ${tileStyles} ${fontSize}
          ${tile.isNew ? 'animate-pulse scale-110' : ''}
          ${tile.isMerged ? 'animate-bounce' : ''}
          shadow-lg hover:shadow-xl transform hover:scale-105
        `}
        style={getDesktopPosition()}
      >
        <span className="text-center leading-none">{tile.value}</span>
      </div>
    </>
  );
};