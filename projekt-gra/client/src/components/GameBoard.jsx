import { connect } from "react-redux";

import Board from "../Board";
import Chatbox from "../Chatbox";
import { deleteGame } from "../actions/gameActions";

const GameBoard = ({topic, publish, unsubscribe, payload, username, deleteGame}) => {

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
            <div className="game-box">
            <button onClick={handleUnsub} style={{"height": "70%"}}>{"<--"}</button>
            <Board/>
            <Chatbox topic={topic} publish={publish} payload={payload} username={username}/>
            </div>

            <button onClick={handleDeleteRoom}>Usuń pokój</button>
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