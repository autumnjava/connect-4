import { COLS, ROWS } from '../components/Board';
import { Player } from '../types/board-types';

export const checkForWin = (
  currentBoard: Player[][],
  row: number,
  col: number
): boolean => {
  // Check vertically
  for (let i = 0; i <= ROWS - 4; i++) {
    if (
      currentBoard[i][col] &&
      currentBoard[i][col] === currentBoard[i + 1][col] &&
      currentBoard[i][col] === currentBoard[i + 2][col] &&
      currentBoard[i][col] === currentBoard[i + 3][col]
    ) {
      return true;
    }
  }

  // Check horizontally
  for (let j = 0; j <= COLS - 4; j++) {
    if (
      currentBoard[row][j] &&
      currentBoard[row][j] === currentBoard[row][j + 1] &&
      currentBoard[row][j] === currentBoard[row][j + 2] &&
      currentBoard[row][j] === currentBoard[row][j + 3]
    ) {
      return true;
    }
  }

  // Check diagonally
  for (let i = 0; i <= ROWS - 4; i++) {
    for (let j = 0; j <= COLS - 4; j++) {
      if (
        currentBoard[i][j] &&
        currentBoard[i][j] === currentBoard[i + 1][j + 1] &&
        currentBoard[i][j] === currentBoard[i + 2][j + 2] &&
        currentBoard[i][j] === currentBoard[i + 3][j + 3]
      ) {
        return true;
      }

      if (
        currentBoard[i][j + 3] &&
        currentBoard[i][j + 3] === currentBoard[i + 1][j + 2] &&
        currentBoard[i][j + 3] === currentBoard[i + 2][j + 1] &&
        currentBoard[i][j + 3] === currentBoard[i + 3][j]
      ) {
        return true;
      }
    }
  }

  return false;
};
