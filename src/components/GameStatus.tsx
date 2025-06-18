import React from 'react';
import { Trophy, X, RotateCcw } from 'lucide-react';

interface GameStatusProps {
  gameStatus: 'playing' | 'won' | 'lost';
  onNewGame: () => void;
  onContinue?: () => void;
}

export const GameStatus: React.FC<GameStatusProps> = ({ gameStatus, onNewGame, onContinue }) => {
  if (gameStatus === 'playing') return null;

  const isWon = gameStatus === 'won';
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm p-4">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl max-w-sm sm:max-w-md w-full transform animate-pulse">
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full mb-4 ${
            isWon ? 'bg-gradient-to-br from-yellow-400 to-yellow-500' : 'bg-gradient-to-br from-red-400 to-red-500'
          }`}>
            {isWon ? (
              <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            ) : (
              <X className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            )}
          </div>
          
          <h2 className={`text-2xl sm:text-3xl font-bold mb-2 ${
            isWon ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {isWon ? 'You Win!' : 'Game Over'}
          </h2>
          
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            {isWon 
              ? 'Congratulations! You reached 2048!' 
              : 'No more moves available. Try again!'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onNewGame}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 active:scale-95 text-white px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 touch-manipulation"
            >
              <RotateCcw className="w-4 h-4" />
              New Game
            </button>
            
            {isWon && onContinue && (
              <button
                onClick={onContinue}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 active:scale-95 text-white px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 touch-manipulation"
              >
                Continue
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};