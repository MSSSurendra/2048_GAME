import React from 'react';
import { RotateCcw, Trophy, Target } from 'lucide-react';

interface GameHeaderProps {
  score: number;
  bestScore: number;
  onNewGame: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ score, bestScore, onNewGame }) => {
  return (
    <div className="flex justify-between items-center mb-4 sm:mb-6 flex-wrap gap-2 sm:gap-4">
      <div className="flex items-center gap-2">
        <Target className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
        <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
        2048
        </h1>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="flex gap-2 sm:gap-3">
          <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-2 sm:p-3 rounded-xl border border-orange-300 shadow-lg min-w-0">
            <div className="text-xs font-semibold text-orange-700 uppercase tracking-wide">Score</div>
            <div className="text-lg sm:text-xl font-bold text-orange-800 truncate">{score.toLocaleString()}</div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-2 sm:p-3 rounded-xl border border-yellow-300 shadow-lg min-w-0">
            <div className="flex items-center gap-1 text-xs font-semibold text-yellow-700 uppercase tracking-wide">
              <Trophy className="w-3 h-3" />
              <span className="hidden xs:inline">Best</span>
            </div>
            <div className="text-lg sm:text-xl font-bold text-yellow-800 truncate">{bestScore.toLocaleString()}</div>
          </div>
        </div>
        
        <button
          onClick={onNewGame}
          className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 active:scale-95 text-white px-3 sm:px-4 py-2 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 touch-manipulation"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden xs:inline">New Game</span>
          <span className="xs:hidden">New</span>
        </button>
      </div>
    </div>
  );
};