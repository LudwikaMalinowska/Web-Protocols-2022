import { connect } from "react-redux";
import { useEffect, useState } from 'react';

import Board from "./Board";
import Chatbox from "./Chatbox";
import { deleteGame } from "../actions/gameActions";

import EditRoom from "./EditRoom";
import { getGameUserList, deleteUserFromGame } from "../actions/gameUserActions";
import UsersInGameBox from "./UsersInGameBox";

const GameBoard = ({game, users, gameUsers, topic, client,publish, unsubscribe, payload, username, deleteGame, getGameUserList, deleteUserFromGame}, props) => {
    const [editing, setEditing] = useState(false);
            
    console.log("gu", gameUsers)

    useEffect(() => {
        getGameUserList(topic);
    }, [])

    const handleUnsub = () => {
        unsubscribe(topic);
        deleteUserFromGame(topic, client.options.clientId);
        publish(topic, JSON.stringify({username, roomTopic: topic, type: "leave-room"}))
    };

    const handleDeleteRoom = () => {
        console.log("topic:", topic);
        deleteGame(topic);
        unsubscribe(topic);
        
    }

    
    return ( 
        <div className="room">
        <h3>{game ? game.gameName : ""}</h3>
            <div className="game-box">
            <button onClick={handleUnsub} >{"<--"}</button>
            <Board/>
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
 
const mapStateToProps = (state, props) => {
    console.log("state:", state);
    // const gameId = props.match.params.gameId;
    console.log("props:", props);
    return {
        games: state.games,
        // game: state.game,
        users: state.users,
        gameUsers: state.gameUsers
    }
}

const mapDispatchToProps = {
    deleteGame,
    getGameUserList,
    deleteUserFromGame
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);