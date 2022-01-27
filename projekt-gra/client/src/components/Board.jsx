import { useState } from "react";
import "./../board.css";

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

    const countPoints = (dices, number) => {
        const occurency = _.countBy(dices, dice => dice === number);

        return occurency * number;
    }

    const ifGeneral = (dices) => {
        return dices.every(dice => dice === dices[0])
    }

    // console.log(ifGeneral(dices));

    const ifBigStrit = (dices) => {
        const sorted = _.sortBy(dices, (d1, d2) => d1 - d2);
        let ifB = true;
        for (let i = 1; i < dices.length; i++){
            if (sorted[i-1] !== sorted[i] + 1){
                ifB = false;
                break;
            }
        }

        return ifB;
    }

    const ifSmallStrit = dices => {
        const nDices = new Array(new Set(dices));

        return ifBigStrit(nDices);
    }
    
    return ( 
       <div className="board">
       <table className="score-table">
        <tr>
            <td>1</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td>2</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td>3</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td>4</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td>5</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td>6</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td>x3</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td>x4</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td>2+3</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td>mały strit</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td>duży strit</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td>generał</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td>suma =</td>
            <td>0</td>
            <td>0</td>
        </tr>
       </table>
       <div className="rolling">
       <div className="dices">
       {content}
       </div>
        

        <button className="reroll"
        onClick={rollDices}>Roll</button>
        <p>Suma: {_.sum(dices)}</p>
       </div>
       
       </div>
     );
}

export default Board;
 