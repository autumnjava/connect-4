import { MouseEventHandler } from 'react';
import { Player } from '../types/board-types';

type CellProps = {
  player: Player;
  onClick: MouseEventHandler<HTMLDivElement>;
};

export const Cell = (props: CellProps) => {
  const { player, onClick } = props;

  return <div className={`cell ${player}`} onClick={onClick}></div>;
};
