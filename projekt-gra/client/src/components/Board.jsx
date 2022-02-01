import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getGameBoard, updateGameBoard } from "../actions/boardActions";
import { getGame, updateGame} from "../actions/gameActions";
import { updateGameUser } from "../actions/gameUserActions";
import { addMove, getMoveList, deleteMove, changeMove } from "../actions/moveActions";
import "./../board.css";

const _ = require("lodash");
const Cookies = require('js-cookie')


const Board = ({gameId, game, username, client, addMove, getMoveList, getGame, deleteMove, moves, getGameBoard, board, updateGameBoard, updateGame, intervals, setIntervals, publish, updateGameUser, changeMove}) => {
    const [dices, setDices] = useState([0,0,0,0,0]);
    let playerTurn = Cookies.get('playerTurn');
    const [isPlayer, setIsPlayer] = useState(false);
    const [player, setPlayer] = useState('');
    const [intervals2, setIntervals2] = useState(null);
    const [changingMove, setChangingMove] = useState(false);
    const [moveChanged, setMoveChanged] = useState(false);
    const [moveDeleted, setMoveDeleted] = useState(false);
    const [rollsLeft, setRollsLeft] = useState(3);
    const [previousCounter, setPreviousCounter] = useState(3);
    

    useEffect(async () => {
        rollDices();
        await getGame(gameId);
        await getMoveList(gameId);
        await getGameBoard(gameId);

        const interval1 = setInterval(() => {
            getGameBoard(gameId);
            // getMoveList(gameId);
        }, 500);

        setTimeout(() => {
            const interval2 = setInterval(() => {
                if (board.player1 && (game.gameId === gameId)
                    && isNoEmptyField(board)){
                    announceWinner(board);
                    clearInterval(intervals2);

                }
            }, 1000);
            setIntervals2(interval2);
        }, 2000);
       

        setIntervals([...intervals, interval1]);
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
        setDices(newDices);
    }

    const clickRollDices = () => {
        rollDices();
        setRollsLeft(rollsLeft - 1);
    }

    let i = 1;
    const content = dices.map(dice => ( 
            <div key={i++}
            className="dice">{dice}</div>
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

    const count3X = dices => {
        const counted = _.countBy(dices);
        let points = 0;
        Object.keys(counted).forEach(num => {
            if (counted[num] >= 3) {
                points = Number(num) * counted[num];
            }

        })
        

        return points;
    }

    const count4X = dices => {
        const counted = _.countBy(dices);
        let points = 0;
        Object.keys(counted).forEach(num => {
            if (counted[num] >= 4) {
                points = Number(num) * counted[num];
            }

        })
        

        return points;
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
            case 'x3':
                return count3X(dices);
            case 'x4':
                return count4X(dices);
            case 'szansa':
                const sumDices = _.sum(dices);
                return sumDices;
            default:
                return 0;
        }
    }

    const clickField = (field, showPoints) => {
        console.log(player, playerTurn);
        playerTurn = Cookies.get('playerTurn');
        const board2 = 
            JSON.parse(JSON.stringify(board));
        if (playerTurn === player) {
            
            board2[playerTurn][field].clicked = true;
            board2[playerTurn][field].value = showPoints;

            
            updateGameBoard(gameId, board2);

            const move = {
                username: username,
                playerNr: player,
                field: field,
                points: showPoints
            }
            
            const nextTurn = (playerTurn === "player1") ? "player2" : "player1";

            if (changingMove) {
                setChangingMove(false);
                changeMove(gameId, move);
            } else {
                addMove(gameId, move);
                setMoveChanged(false);
            }
            
            Cookies.set('playerTurn', nextTurn)
            
            updateGame(gameId, {playerTurn: nextTurn});
            rollDices();
            setPreviousCounter(rollsLeft);
            setRollsLeft(3);


            if (isNoEmptyField(board2)) {
                announceWinner(board2);
            }
            
        }
    }

    const deleteMoveClick = async () => {
        console.log(moves);
        console.log(moves.length);
        if (moves.length <= 0){
            alert("Brak ruchów do cofnięcia.")
        }
        else if (moveDeleted) {
            alert("Ruch można usunąć tylko raz na grę.")
        }
        else if (moves.length > 0){
            const lastMove = moves[moves.length - 1];
            console.log(lastMove);
            if (lastMove.playerNr === player) {
                setRollsLeft(previousCounter);
                const nBoard = JSON.parse(JSON.stringify(board));
                nBoard[lastMove.playerNr][lastMove.field].value = 0;
                nBoard[lastMove.playerNr][lastMove.field].clicked = false;
                console.log(nBoard);
                await updateGameBoard(gameId, nBoard)
                await deleteMove(gameId);
                const nextTurn = (playerTurn === "player1") ? "player2" : "player1";
                Cookies.set('playerTurn', nextTurn);
                setMoveDeleted(true)
            }
            else {
                alert(`Tylko ${lastMove.playerNr} może cofnąć ruchy gracza ${lastMove.playerNr}.`)
            }
        }
        
    }

    const changeMoveClick = async () => {
        
        if (changingMove) {}
        else if(moves.length <= 0){ 
            alert("Brak ruchów do zmiany.")
        }
        else {
            const lastMove = moves[moves.length - 1];
            console.log(lastMove);
            if (lastMove.playerNr !== player) {
                alert(`Najpierw wykonaj ruch.`)
            }
            else if (moveChanged){
                alert("Ruch można zmienić tylko raz na turę.")
            }
            else {
                setChangingMove(true);
                setRollsLeft(previousCounter);
                const nBoard = JSON.parse(JSON.stringify(board));
                nBoard[lastMove.playerNr][lastMove.field].value = 0;
                nBoard[lastMove.playerNr][lastMove.field].clicked = false;
                console.log(nBoard);
                await updateGameBoard(gameId, nBoard);
                const nextTurn = (playerTurn === "player1") ? "player2" : "player1";
                Cookies.set('playerTurn', nextTurn);
                setMoveChanged(true);
            }
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

        publish(gameId, JSON.stringify({type: "win", text: winnerText}))
    }

    const addAsPlayer = () => {
        if (game.player1_id === ''){
            setIsPlayer(true);
            setPlayer('player1');
            updateGame(gameId, {player1_id: client.options.clientId});

            updateGameUser(gameId, client.options.clientId, {isPlayer: true, playerNr: 'player1'})
        } else if (game.player2_id === '') {
            setIsPlayer(true);
            setPlayer('player2');
            updateGame(gameId, {player2_id: client.options.clientId})

            updateGameUser(gameId, client.options.clientId, {isPlayer: true, playerNr: 'player2'})
        } else {
            alert("Ta gra ma już 2 graczy!")
        }
    }

    const fields =  ['1', '2', '3', '4', '5', '6', 'x3', 'x4', 'mały strit', 'duży strit', 'generał', 'szansa'];
    const tableContent = (board) => fields.map(field => {
        const showPoints = countPoints(field, dices);

        const greyClick = (<td className="grey"
        onClick={() => {
            clickField(field, showPoints)
        }}
        >{showPoints}</td>);
        const greyNoClick = (
            <td className="grey"
                >{showPoints}</td>
        )

        const p1Field = (board.player1[field].clicked) ? (
            <td className="black">{board.player1[field].value}</td>
        ) : (
            (playerTurn === "player1") ? (
                (isPlayer) ? greyClick : greyNoClick
            ) : (
                <td> </td>
            )
            
        );

        const p2Field = (board.player2[field].clicked) ? (
            
            <td className="black">{board.player2[field].value}</td>
        ) : (
            (playerTurn === "player2") ? (
                (isPlayer) ? greyClick : greyNoClick
            ) : (
                <td> </td>
            )
            
        );
        
        
        return (
            <tr key={field}>
                <td>{field}</td>
                {p1Field}
                {p2Field}
            </tr>
        )
        
        
    })
    
    return ( 
       <div className="board">
       <table className="score-table">
        
        <thead>
            <tr>
                <td> </td>
                <td>P1</td>
                <td>P2</td>
            </tr>
        </thead>
        <tbody>
        {board.player1 && tableContent(board)}
        <tr>
            
            <td>suma =</td>
            <td>{board.player1 && sumPointsPlayer1(board)}</td>
            <td>{board.player2 && sumPointsPlayer2(board)}</td>
        </tr>
        </tbody>
        
       </table>

       
       <div className="rolling">
       <p>Zostało rzutów: {rollsLeft}</p>
       <div className="dices">
       {content}
       </div>
        

        {isPlayer && (rollsLeft > 0) && <button className="reroll"
        onClick={clickRollDices}>Roll</button>}
        <p>Suma: {_.sum(dices)}</p>
        {isPlayer && <button onClick={deleteMoveClick}>Cofnij ruch</button>}
        {isPlayer && <button onClick={changeMoveClick}>
            Zmień ruch
        </button>}
        {!isPlayer && <button
            onClick={addAsPlayer}
        >Dołącz do gry</button>}
       </div>
       
       </div>
     );
}

const mapStateToProps = (state) => {
    // console.log("state", state);
    
    return {
        games: state.games,
        users: state.users,
        moves: state.moves,
        game: state.game,
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
    updateGame,
    updateGameUser,
    changeMove
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
 