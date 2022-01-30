import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getGameBoard, updateGameBoard } from "../actions/boardActions";
import { getGame, updateGame} from "../actions/gameActions";
import { addMove, getMoveList, deleteMove } from "../actions/moveActions";
import "./../board.css";

const _ = require("lodash");
const Cookies = require('js-cookie')


const Board = ({gameId, game, username, addMove, getMoveList, getGame, deleteMove, moves, getGameBoard, board, updateGameBoard, updateGame}) => {
    const [dices, setDices] = useState([1,2,3,4,5]);
    const playerTurn = Cookies.get('playerTurn');

    console.log("--mm", moves);

    useEffect(async () => {
        await getMoveList(gameId);
        await getGameBoard(gameId)
    }, [])



    const sumPointsPlayer1 = (board) => Object.values(board.player1).reduce((acc, field) => {
        return acc + field.value;
    }, 0)
    const sumPointsPlayer2 = (board) => Object.values(board.player2).reduce((acc, field) => {
        return acc + field.value;
    }, 0)
    const isNoEmptyField = (board) => {
        const player1Fields = _.every(board.player1, ['clicked', true]);
        const player2Fields = _.every(board.player2, ['clicked', true]);

        return player1Fields && player2Fields;
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

    const clickField = (field, showPoints) => {
        const board2 = 
            JSON.parse(JSON.stringify(board));
        board2[playerTurn][field].clicked = true;
        board2[playerTurn][field].value = showPoints;

        // console.log("board2", board2);
        updateGameBoard(gameId, board2);

        const move = {
            username: username,
            playerNr: playerTurn,
            field: field,
            points: showPoints
        }
        
        const nextTurn = (playerTurn === "player1") ? "player2" : "player1";
        addMove(game.gameId, move)
        Cookies.set('playerTurn', nextTurn)
        // const nGame = {
        //     ...game,
        //     playerTurn: nextTurn
        // }
        updateGame(gameId, {playerTurn: nextTurn});
        
        if (isNoEmptyField(board2)) {
            announceWinner(board2);
        }

    }

    const announceWinner = (board) => {
        const pointsPlayer1 = sumPointsPlayer1(board);
        const pointsPlayer2 = sumPointsPlayer2(board);
        let winner;
        let winnerText;
        if (pointsPlayer1 > pointsPlayer2) {
            winner = "player1";
            winnerText = "Wygrał gracz 1!"
        }
        else if (pointsPlayer1 < pointsPlayer2) {
            winner = "player2";
            winnerText = "Wygrał gracz 2!"
        }
        else {
            winner = null;
            winnerText = "Remis!"
        }

        alert(winnerText);
    }

    const fields =  ['1', '2', '3', '4', '5', '6', 'x3', 'x4', 'mały strit', 'duży strit', 'generał']
    const tableContent = (board) => fields.map(field => {
        const showPoints = countPoints(field, dices);

        const p1Field = (board.player1[field].clicked) ? (
            <td className="black">{board.player1[field].value}</td>
        ) : (
            (playerTurn === "player1") ? (
                <td className="grey"
                onClick={() => {
                    clickField(field, showPoints)
                }}
                >{showPoints}</td>
            ) : (
                <td> </td>
            )
            
        );

        const p2Field = (board.player2[field].clicked) ? (
            
            <td className="black">{board.player2[field].value}</td>
        ) : (
            (playerTurn === "player2") ? (
                <td className="grey"
                    onClick={() => {
                        clickField(field, showPoints)
                    }}
            >{showPoints}</td>
            ) : (
                <td> </td>
            )
            
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
            <td>{sumPointsPlayer1(board)}</td>
            <td>{sumPointsPlayer2(board)}</td>
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
    updateGameBoard,
    updateGame
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
 