import { useEffect, useState } from 'react';
import { Cell } from './Cell';
import { Controls } from './Controls';
import { Player, Winner } from '../types/board-types';
import { checkForWin } from '../helpers/check-for-win';

export const ROWS = 6;
export const COLS = 7;

const initializeBoard = (): Player[][] =>
  Array.from({ length: ROWS }, () => Array(COLS).fill(null));

export const Board = () => {
  const [boardHistory, setBoardHistory] = useState<Player[][][]>(() => {
    const savedState = localStorage.getItem('connect4_boardHistory');
    return savedState ? JSON.parse(savedState) : [initializeBoard()];
  });

  const [currentPlayer, setCurrentPlayer] = useState<Player>(() => {
    const savedPlayer = localStorage.getItem('connect4_currentPlayer');
    return savedPlayer ? (savedPlayer as Player) : 'Red';
  });

  const [winner, setWinner] = useState<Winner>(() => {
    const savedWinner = localStorage.getItem('connect4_winner');
    return savedWinner ? (savedWinner as Winner) : null;
  });

  const currentBoard = boardHistory[boardHistory.length - 1];

  useEffect(() => {
    localStorage.setItem('connect4_boardHistory', JSON.stringify(boardHistory));
    localStorage.setItem('connect4_currentPlayer', currentPlayer || '');
    localStorage.setItem('connect4_winner', winner || '');
  }, [boardHistory, currentPlayer, winner]);

  const resetBoard = () => {
    localStorage.removeItem('connect4_boardHistory');
    localStorage.removeItem('connect4_currentPlayer');
    localStorage.removeItem('connect4_winner');
    setBoardHistory([initializeBoard()]);
    setCurrentPlayer('Red');
    setWinner(null);
  };

  const handleCellClick = (col: number) => {
    if (winner) return;
    const newBoard = currentBoard.map((row) => [...row]);

    let row = ROWS - 1;
    while (row >= 0) {
      if (!newBoard[row][col]) {
        newBoard[row][col] = currentPlayer;
        break;
      }
      row--;
    }
    if (row === -1) return; // Column is full

    const newHistory = [...boardHistory, newBoard];
    setBoardHistory(newHistory);

    if (checkForWin(newBoard, row, col)) {
      setWinner(currentPlayer);
    } else if (newBoard.every((row) => row.every((cell) => cell !== null))) {
      setWinner('Draw');
    } else {
      setCurrentPlayer((prevPlayer) =>
        prevPlayer === 'Red' ? 'Yellow' : 'Red'
      );
    }
  };

  const undoMove = () => {
    if (boardHistory.length > 1) {
      setBoardHistory(boardHistory.slice(0, -1));
      setCurrentPlayer(
        winner ? currentPlayer : currentPlayer === 'Red' ? 'Yellow' : 'Red'
      );
      setWinner(null);
    }
  };

  return (
    <div>
      <div className='board'>
        {currentBoard.map((row, rowIndex) => (
          <div key={rowIndex} className='row'>
            {row.map((_, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                player={row[colIndex]}
                onClick={() => handleCellClick(colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
      <Controls
        winner={winner}
        currentPlayer={currentPlayer}
        resetBoard={resetBoard}
        undoMove={undoMove}
      />
    </div>
  );
};
