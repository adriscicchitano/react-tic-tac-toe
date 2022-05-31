import React from 'react';
import 'css/index.css';

export function Square(props){
    return (
        <button
            className={props.isWinner ? "winning_square" : "square"}
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}