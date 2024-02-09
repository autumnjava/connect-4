import { Player, Winner } from '../types/board-types';

type ControlsComponentProps = {
  winner: Winner;
  currentPlayer: Player;
  resetBoard: () => void;
  undoMove: () => void;
};

export const Controls = (props: ControlsComponentProps) => {
  const { winner, currentPlayer, resetBoard, undoMove } = props;
  return (
    <div>
      {winner ? (
        <h2>{winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}`}</h2>
      ) : (
        <h2>Current player: {currentPlayer}</h2>
      )}
      <div className='controls'>
        <button onClick={() => resetBoard()}>Restart</button>
        <button onClick={() => undoMove()}>Undo</button>
      </div>
    </div>
  );
};
