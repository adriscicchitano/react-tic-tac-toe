import React from 'react';
import 'css/index.css';

export function Square(props){
    return (
        <button 
            className="square" 
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}