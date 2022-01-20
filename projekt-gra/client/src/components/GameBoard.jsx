import Board from "../Board";
import Chatbox from "../Chatbox";

const GameBoard = ({topic, publish, payload, username}) => {
    return ( 
        <div className="game-box">
            <Board/>
            <Chatbox topic={topic} publish={publish} payload={payload} username={username}/>
        </div>
     );
}
 
export default GameBoard;