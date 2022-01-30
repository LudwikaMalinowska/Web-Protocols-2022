import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getGameBoard, updateGameBoard } from "../actions/boardActions";
import { getGame} from "../actions/gameActions";
import { addMove, getMoveList, deleteMove } from "../actions/moveActions";
import "./../board.css";

const _ = require("lodash");


const Board = ({gameId, game, username, addMove, getMoveList, getGame, deleteMove, moves, getGameBoard, board, updateGameBoard}) => {
    const [dices, setDices] = useState([1,2,3,4,5]);

    console.log("--mm", moves);

    useEffect(async () => {
        await getMoveList(gameId);
        await getGameBoard(gameId)
    }, [])



    let sumPointsPlayer1;
    let sumPointsPlayer2;
    if (board.player1) {
        sumPointsPlayer1 = Object.values(board.player1).reduce((acc, field) => {
            return acc + field.value;
        }, 0)
        sumPointsPlayer2 = Object.values(board.player2).reduce((acc, field) => {
            return acc + field.value;
        }, 0)
    }
    

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

        return occurency * number;
    }

    const ifGeneral = (dices) => {
        return dices.every(dice => dice === dices[0])
    }


    const ifBigStrit = (dices) => {
        const sorted = [...dices];
        sorted.sort();
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

    const clickField = (field, showPoints, playerNr) => {
        const board2 = 
            JSON.parse(JSON.stringify(board));
        board2[playerNr][field].clicked = true;
        board2[playerNr][field].value = showPoints;

        // console.log("board2", board2);
        updateGameBoard(gameId, board2);

        const move = {
            username: username,
            playerNr: playerNr,
            field: field,
            points: showPoints
        }
        
        addMove(game.gameId, move)

    }

    const fields =  ['1', '2', '3', '4', '5', '6', 'x3', 'x4', 'mały strit', 'duży strit', 'generał']
    const tableContent = (board) => fields.map(field => {
        const showPoints = countPoints(field, dices);

        const p1Field = (board.player1[field].clicked) ? (
            <td className="black">{board.player1[field].value}</td>
        ) : (
            <td className="grey"
                    onClick={() => {
                        clickField(field, showPoints, "player1")
                    }}
            >{showPoints}</td>
        );

        const p2Field = (board.player2[field].clicked) ? (
            <td className="black">{board.player2[field].value}</td>
        ) : (
            <td className="grey"
                    onClick={() => {
                        clickField(field, showPoints, "player2")
                    }}
            >{showPoints}</td>
        );
        
        //if (board) {
        return (
            <tr>
                <td>{field}</td>
                {p1Field}
                {p2Field}
            </tr>
        )
        //}
        
        
    })
    
    return ( 
       <div className="board">
       <table className="score-table">
        {board.player1 && tableContent(board)}
        <tr>
            <td>suma =</td>
            <td>{sumPointsPlayer1}</td>
            <td>{sumPointsPlayer2}</td>
        </tr>
       </table>
       <div className="rolling">
       <div className="dices">
       {content}
       </div>
        

        <button className="reroll"
        onClick={rollDices}>Roll</button>
        <p>Suma: {_.sum(dices)}</p>
        <button onClick={() => deleteMove(gameId)}>Cofnij ruch</button>
       </div>
       
       </div>
     );
}

const mapStateToProps = (state) => {
    console.log("state", state);
    
    return {
        games: state.games,
        users: state.users,
        moves: state.moves,
        // game: state.game,
        board: state.board
    }
}

const mapDispatchToProps = {
    getMoveList,
    addMove,
    getGame,
    deleteMove,
    getGameBoard,
    updateGameBoard
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
 