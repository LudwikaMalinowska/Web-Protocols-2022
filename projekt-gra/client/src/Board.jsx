import { useState } from "react";
import "./board.css";

const _ = require("lodash");


const Board = () => {
    const [dices, setDices] = useState([1,2,3,4,5]);
    // const dices = [1,2,3,4,5];
    const rollDiceNr = () => Math.floor(Math.random() * 6 + 1);

    const rollDices = () => {
        const newDices = []
        for (let i = 0; i < 5; i++){
            newDices.push(rollDiceNr());
        }
        setDices(newDices)
    }

    const content = dices.map(dice => (
        <div className="dice">{dice}</div>
    ))
    
    return ( 
       <div className="board">
       <div className="dices">
       {content}
       </div>
        

        <button className="reroll"
        onClick={rollDices}>Roll</button>
        <p>Suma: {_.sum(dices)}</p>
       </div>
     );
}

export default Board;
 