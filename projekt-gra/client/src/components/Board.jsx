import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getGame } from "../actions/gameActions";
import { addMove, getMoveList, deleteMove } from "../actions/moveActions";
import "./../board.css";

const _ = require("lodash");

const pointsInit = {
    '1': {value: 0, clicked: false},
    '2': {value: 0, clicked: false},
    '3': {value: 0, clicked: false},
    '4': {value: 0, clicked: false},
    '5': {value: 0, clicked: false},
    '6': {value: 0, clicked: false},
    'x3': {value: 0, clicked: false},
    'x4': {value: 0, clicked: false},
    'mały strit': {value: 0, clicked: false},
    'duży strit': {value: 0, clicked: false}, 
    'generał': {value: 0, clicked: false}
};

const Board = ({game, username, addMove, getMoveList, getGame, deleteMove}) => {
    // const [messages, setMessages] = useState([]);
    const [dices, setDices] = useState([1,2,3,4,5]);
    // const dices = [1,2,3,4,5];
    const [points, setPoints] = useState(pointsInit);

    console.log("--ggggg", game);

    useEffect(() => {
        getMoveList();
    }, [])

    useEffect(() => {
        // getGame(game.gameId);
    })

    // useEffect(() => {
    //     if (payload.topic) {
    //       setMessages(messages => [...messages, payload])

    //       console.log(payload);
    //     }
    //   }, [payload])

    const sumPoints = Object.values(points).reduce((acc, field) => {
        return acc + field.value;
    }, 0)

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

    const countNumberField = (dices, number) => {
        let occurency = _.countBy(dices)[number];
        occurency = occurency ? occurency : 0;

        // console.log(occurency);
        return occurency * number;
    }

    const ifGeneral = (dices) => {
        return dices.every(dice => dice === dices[0])
    }


    const ifBigStrit = (dices) => {
        const sorted = [...dices];
        sorted.sort();
        // console.log("s", sorted);
        let ifB = true;
        for (let i = 1; i < dices.length; i++){
            if (sorted[i-1] + 1 !== sorted[i]){
                
                return false;
            }
        }

        return ifB;
    }

    const ifSmallStrit = dices => {
        let nDices = Array.from(new Set(dices));
        // console.log(nDices);
        if (nDices.length < 4)
            return false;
        else
            return ifBigStrit(nDices);
    }

    const countPoints = (field, dices) => {
        switch (field){
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
                return countNumberField(dices, Number(field));
            case 'mały strit':
                const ifS = ifSmallStrit(dices);
                if (ifS)
                    return 30;
                else
                    return 0;
            case 'duży strit':
                const ifB = ifBigStrit(dices);
                if (ifB)
                    return 40;
                else
                    return 0;
            case 'generał':
                const ifG = ifGeneral(dices);
                if (ifG)
                    return 50;
                else
                    return 0;
            default:
                return 0;
        }
    }

    const clickField = (field, showPoints) => {
        // console.log("click");
        const points2 = 
            JSON.parse(JSON.stringify(points));
        points2[field].clicked = true;
        points2[field].value = showPoints;
        // console.log(points2);
        setPoints(points2); 

        const move = {
            username: username,
            field: field,
            points: showPoints
        }
        //push move to moves
        addMove(game.gameId, move)

    }

    const fields =  ['1', '2', '3', '4', '5', '6', 'x3', 'x4', 'mały strit', 'duży strit', 'generał']
    const tableContent = fields.map(field => {
        const showPoints = countPoints(field, dices);
        // const classN = field.clicked
        if (points[field].clicked) {
            return (
                <tr>
                    <td>{field}</td>
                    <td className="black">{points[field].value}</td>
                    <td>0</td>
                </tr>
            )
        } else {
            return (
                <tr>
                    <td>{field}</td>
                    <td className="grey"
                    onClick={() => {
                        clickField(field, showPoints)
                    }}
                    >{showPoints}</td>
                    <td>0</td>
                </tr>
            )
        }
        
        
    })
    
    return ( 
       <div className="board">
       <table className="score-table">
        {tableContent}
        <tr>
            <td>suma =</td>
            <td>{sumPoints}</td>
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
        <button onClick={() => deleteMove(game.gameId)}>Cofnij ruch</button>
       </div>
       
       </div>
     );
}

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        games: state.games,
        users: state.users,
        moves: state.moves,
        // game: state.game
    }
}

const mapDispatchToProps = {
    getMoveList,
    addMove,
    getGame,
    deleteMove
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
 