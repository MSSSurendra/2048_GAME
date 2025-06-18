import { useState, useCallback, useEffect } from 'react';
import { GameState, Direction } from '../types/game';
import { initializeGame, moveBoard } from '../utils/gameLogic';

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>(() => initializeGame());

  const handleMove = useCallback((direction: Direction) => {
    setGameState(currentState => moveBoard(currentState, direction));
  }, []);

  const handleNewGame = useCallback(() => {
    setGameState(initializeGame());
  }, []);

  const handleContinue = useCallback(() => {
    setGameState(currentState => ({
      ...currentState,
      gameStatus: 'playing'
    }));
  }, []);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (gameState.gameStatus !== 'playing') return;

    const keyMap: { [key: string]: Direction } = {
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right',
      w: 'up',
      s: 'down',
      a: 'left',
      d: 'right'
    };

    const direction = keyMap[event.key];
    if (direction) {
      event.preventDefault();
      handleMove(direction);
    }
  }, [gameState.gameStatus, handleMove]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return {
    gameState,
    handleMove,
    handleNewGame,
    handleContinue
  };
};