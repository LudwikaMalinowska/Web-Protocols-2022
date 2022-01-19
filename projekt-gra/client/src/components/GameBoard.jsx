import Board from "../Board";
import Chatbox from "../Chatbox";

const GameBoard = ({topic, publish, payload}) => {
    return ( 
        <div className="game-box">
            <Board/>
            <Chatbox topic={topic} publish={publish} payload={payload}/>
        </div>
     );
}
 
export default GameBoard;