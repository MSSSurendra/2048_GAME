import React from 'react';
import { GameBoard } from './components/GameBoard';
import { GameHeader } from './components/GameHeader';
import { GameStatus } from './components/GameStatus';
import { GameInstructions } from './components/GameInstructions';
import { useGame } from './hooks/useGame';
import { useSwipeGestures } from './hooks/useSwipeGestures';
import { Github, Linkedin, Mail } from 'lucide-react';

function App() {
  const { gameState, handleMove, handleNewGame, handleContinue } = useGame();

  useSwipeGestures({
    onSwipe: handleMove,
    isEnabled: gameState.gameStatus === 'playing'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-sm sm:max-w-md" data-game-area>
        <GameHeader
          score={gameState.score}
          bestScore={gameState.bestScore}
          onNewGame={handleNewGame}
        />
        
        <div className="flex justify-center mb-4 game-board">
          <GameBoard board={gameState.board} />
        </div>
        
        <GameInstructions />
        
        <GameStatus
          gameStatus={gameState.gameStatus}
          onNewGame={handleNewGame}
          onContinue={gameState.gameStatus === 'won' ? handleContinue : undefined}
        />

        <footer className="mt-12 text-center">
          <div className="flex justify-center gap-8 flex-wrap mb-6">
            <a
              href="https://www.linkedin.com/in/surendrameka"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-black hover:text-blue-600 transition-colors duration-200"
            >
              <Linkedin className="w-6 h-6" />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://www.github.com/MSSSurendra"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-black hover:text-blue-600 transition-colors duration-200"
            >
              <Github className="w-6 h-6" />
              <span>GitHub</span>
            </a>

            <a
              href="mailto:surendrachowdarymeka18@gmail.com"
              className="inline-flex items-center gap-2 text-black hover:text-blue-600 transition-colors duration-200"
            >
              <Mail className="w-6 h-6" />
              <span>Email</span>
            </a>
          </div>
          <p className="text-black-300 text-sm">
              Made with ❤️ by <span className="font-semibold text-[#ec9832]">M S S Surendra :)</span> Using React.js
            </p>
            <p className="text-gray-500 text-xs mt-1">
              © {new Date().getFullYear()} All rights reserved.
            </p>
           
        </footer>




      </div>
    </div>
  );
}

export default App;