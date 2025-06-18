import { Tile, GameState, Direction } from '../types/game';

export const GRID_SIZE = 4;

export const createEmptyBoard = (): (Tile | null)[][] => {
  return Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const getEmptyPositions = (board: (Tile | null)[][]): { row: number; col: number }[] => {
  const positions: { row: number; col: number }[] = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (!board[row][col]) {
        positions.push({ row, col });
      }
    }
  }
  return positions;
};

export const addRandomTile = (board: (Tile | null)[][]): (Tile | null)[][] => {
  const emptyPositions = getEmptyPositions(board);
  if (emptyPositions.length === 0) return board;

  const randomPosition = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
  const value = Math.random() < 0.9 ? 2 : 4;
  
  const newBoard = board.map(row => [...row]);
  newBoard[randomPosition.row][randomPosition.col] = {
    id: generateId(),
    value,
    row: randomPosition.row,
    col: randomPosition.col,
    isNew: true
  };

  return newBoard;
};

export const initializeGame = (): GameState => {
  let board = createEmptyBoard();
  board = addRandomTile(board);
  board = addRandomTile(board);

  const bestScore = parseInt(localStorage.getItem('2048-best-score') || '0');

  return {
    board,
    score: 0,
    bestScore,
    gameStatus: 'playing',
    hasWon: false
  };
};

const moveTilesInDirection = (board: (Tile | null)[][], direction: Direction): {
  newBoard: (Tile | null)[][];
  moved: boolean;
  scoreIncrease: number;
} => {
  const newBoard = createEmptyBoard();
  let moved = false;
  let scoreIncrease = 0;

  const processLine = (line: (Tile | null)[]): { newLine: (Tile | null)[]; moved: boolean; scoreIncrease: number } => {
    const filteredLine = line.filter(tile => tile !== null) as Tile[];
    const newLine: (Tile | null)[] = Array(GRID_SIZE).fill(null);
    let lineScoreIncrease = 0;
    let lineMoved = false;

    let writeIndex = 0;
    for (let i = 0; i < filteredLine.length; i++) {
      const currentTile = filteredLine[i];
      
      if (i < filteredLine.length - 1 && currentTile.value === filteredLine[i + 1].value) {
        // Merge tiles
        const mergedTile: Tile = {
          id: generateId(),
          value: currentTile.value * 2,
          row: currentTile.row,
          col: currentTile.col,
          isMerged: true
        };
        newLine[writeIndex] = mergedTile;
        lineScoreIncrease += mergedTile.value;
        i++; // Skip the next tile as it's been merged
        writeIndex++;
        lineMoved = true;
      } else {
        newLine[writeIndex] = {
          ...currentTile,
          isNew: false,
          isMerged: false
        };
        writeIndex++;
      }
    }

    // Check if any tile moved position
    if (!lineMoved) {
      for (let i = 0; i < line.length; i++) {
        if (line[i] && !newLine[i]) {
          lineMoved = true;
          break;
        }
        if (line[i] && newLine[i] && line[i]!.value !== newLine[i]!.value) {
          lineMoved = true;
          break;
        }
      }
    }

    return { newLine, moved: lineMoved, scoreIncrease: lineScoreIncrease };
  };

  if (direction === 'left' || direction === 'right') {
    for (let row = 0; row < GRID_SIZE; row++) {
      let line = board[row];
      if (direction === 'right') {
        line = [...line].reverse();
      }
      
      const { newLine, moved: lineMoved, scoreIncrease: lineScoreIncrease } = processLine(line);
      
      if (direction === 'right') {
        newLine.reverse();
      }
      
      for (let col = 0; col < GRID_SIZE; col++) {
        if (newLine[col]) {
          newBoard[row][col] = {
            ...newLine[col]!,
            row,
            col
          };
        }
      }
      
      if (lineMoved) moved = true;
      scoreIncrease += lineScoreIncrease;
    }
  } else {
    for (let col = 0; col < GRID_SIZE; col++) {
      let line = board.map(row => row[col]);
      if (direction === 'down') {
        line = [...line].reverse();
      }
      
      const { newLine, moved: lineMoved, scoreIncrease: lineScoreIncrease } = processLine(line);
      
      if (direction === 'down') {
        newLine.reverse();
      }
      
      for (let row = 0; row < GRID_SIZE; row++) {
        if (newLine[row]) {
          newBoard[row][col] = {
            ...newLine[row]!,
            row,
            col
          };
        }
      }
      
      if (lineMoved) moved = true;
      scoreIncrease += lineScoreIncrease;
    }
  }

  return { newBoard, moved, scoreIncrease };
};

export const canMove = (board: (Tile | null)[][]): boolean => {
  // Check for empty spaces
  if (getEmptyPositions(board).length > 0) return true;

  // Check for possible merges
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const current = board[row][col];
      if (!current) continue;

      // Check right neighbor
      if (col < GRID_SIZE - 1 && board[row][col + 1]?.value === current.value) {
        return true;
      }
      
      // Check bottom neighbor
      if (row < GRID_SIZE - 1 && board[row + 1][col]?.value === current.value) {
        return true;
      }
    }
  }

  return false;
};

export const hasWon = (board: (Tile | null)[][]): boolean => {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (board[row][col]?.value === 2048) {
        return true;
      }
    }
  }
  return false;
};

export const moveBoard = (gameState: GameState, direction: Direction): GameState => {
  if (gameState.gameStatus !== 'playing') return gameState;

  const { newBoard, moved, scoreIncrease } = moveTilesInDirection(gameState.board, direction);
  
  if (!moved) return gameState;

  const boardWithNewTile = addRandomTile(newBoard);
  const newScore = gameState.score + scoreIncrease;
  const newBestScore = Math.max(gameState.bestScore, newScore);
  
  if (newBestScore > gameState.bestScore) {
    localStorage.setItem('2048-best-score', newBestScore.toString());
  }

  const wonGame = !gameState.hasWon && hasWon(boardWithNewTile);
  const lostGame = !canMove(boardWithNewTile);

  return {
    ...gameState,
    board: boardWithNewTile,
    score: newScore,
    bestScore: newBestScore,
    gameStatus: wonGame ? 'won' : lostGame ? 'lost' : 'playing',
    hasWon: gameState.hasWon || wonGame
  };
};