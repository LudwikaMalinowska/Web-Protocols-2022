import { connect } from "react-redux";
import { useEffect, useState } from 'react';

import Board from "./Board";
import Chatbox from "./Chatbox";
import { deleteGame, getGame, updateGame } from "../actions/gameActions";

import EditRoom from "./EditRoom";
import { getGameUserList, deleteUserFromGame } from "../actions/gameUserActions";
import UsersInGameBox from "./UsersInGameBox";

const GameBoard = ({game, users, gameUsers, topic, client,publish, unsubscribe, payload, username, deleteGame, getGameUserList, deleteUserFromGame, getGame, updateGame, subscribe}, props) => {
    const [editing, setEditing] = useState(false);
    const [intervals, setIntervals] = useState([])
    const [intervals2, setIntervals2] = useState([])
    

    useEffect(async () => {
        await getGame(topic);
        const interval2 = setInterval(() => {
            getGameUserList(topic);
            getGame(topic);
        }, 1000);
        setIntervals2([...intervals, interval2]);
    }, [])

    const handleUnsub = () => {
        intervals.forEach(i => {
            clearInterval(i);
        })
        intervals2.forEach(i => {
            clearInterval(i);
        })

        
        console.log("-g", game);
        const isPlayer1 = (game.player1_id === client.options.clientId);
        const isPlayer2 = (game.player2_id === client.options.clientId);
        const updates = {}
        if (isPlayer1) {
            updates.player1_id = '';
        } else if (isPlayer2){
            updates.player2_id = '';
        }
        
        updateGame(topic, updates);

        unsubscribe(topic);
        deleteUserFromGame(topic, client.options.clientId);
        publish(topic, JSON.stringify({username, roomTopic: topic, type: "leave-room"}));
        subscribe('game-list-board');
    };

    const handleDeleteRoom = () => {
        deleteGame(topic);
        unsubscribe(topic);

        intervals.forEach(i => {
            clearInterval(i);
        })
    }

    
    return ( 
        <div className="room">
        <h3>{game ? game.gameName : ""}</h3>
            <div className="game-box">
            <button onClick={handleUnsub} >{"<--"}</button>
            <Board username={username} gameId={topic}
                client={client} 
                intervals={intervals} setIntervals={setIntervals}
                publish={publish}
            />
            <Chatbox topic={topic} publish={publish} payload={payload} username={username}/>
            </div>

            
            <button onClick={handleDeleteRoom}>Usuń pokój</button>
            <button onClick={() => setEditing(true)}>Edytuj pokój</button>
            {editing && <EditRoom game={{topic}} setEditing={setEditing}/>}

            <UsersInGameBox topic={topic}
                username={username}
                publish={publish}
                client={client}
            />
        </div>
        
     );
}
 
const mapStateToProps = (state) => {
    // console.log("state:", state);
    return {
        games: state.games,
        game: state.game,
        users: state.users,
        gameUsers: state.gameUsers
    }
}

const mapDispatchToProps = {
    deleteGame,
    getGameUserList,
    deleteUserFromGame,
    getGame,
    updateGame
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);