import React from 'react';
import 'css/index.css';

export function Square({isWinner, onClick, value}){
  return (
    <button
      className={isWinner ? "winning_square" : "square"}
      onClick={onClick}
    >
      {value}
    </button>
    );
}