import React from 'react';
import 'css/index.css';

export function Square({isWinner, onClick, value}){
  return (
    <button
      className={isWinner ? "square winner" : "square default"}
      onClick={onClick}
    >
      {value}
    </button>
    );
}