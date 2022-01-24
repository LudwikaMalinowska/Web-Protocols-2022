import { connect } from "react-redux";

import Board from "../Board";
import Chatbox from "../Chatbox";
import { deleteGame } from "../actions/gameActions";
import { useState } from "react";
import EditRoom from "./EditRoom";

const GameBoard = ({game, topic, publish, unsubscribe, payload, username, deleteGame}) => {
    const [editing, setEditing] = useState(false);

    const handleUnsub = () => {
        unsubscribe(topic);
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
            <button onClick={handleUnsub} style={{"height": "70%"}}>{"<--"}</button>
            <Board/>
            <Chatbox topic={topic} publish={publish} payload={payload} username={username}/>
            </div>

            <button onClick={handleDeleteRoom}>Usuń pokój</button>
            <button onClick={() => setEditing(true)}>Edytuj pokój</button>
            {editing && <EditRoom game={{topic}} setEditing={setEditing}/>}
        </div>
        
     );
}
 
const mapStateToProps = (state) => {
    console.log(state);
    return {
        games: state.games
    }
}

const mapDispatchToProps = {
    deleteGame
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);