import {v4 as uuidv4 } from 'uuid';
import { connect } from "react-redux";
import { addGameAction, getGameList } from '../actions/gameActions';
import { useEffect } from 'react';
import { useRef } from 'react';
import GameListBoard from './GameListBoard';

const GameList = ({client, subscribe, publish, payload, username, setTopic, addGameAction, getGameList}) => {
    const inputRoomId = useRef(null);
    

    useEffect(() => {
        //getGameList();
    }, [])

    const handleSubscribe = (topic) => {
        subscribe(topic);
        console.log("Subscribed to " + topic);
        setTopic(topic);
    }

    const createRoom = () => {
        const roomTopic = "game" + uuidv4()

        console.log("roomTopic: ", roomTopic);
        publish('game-list-board', JSON.stringify({username, roomTopic, type: "create-room"}))
        handleSubscribe(roomTopic);
        addGameAction(roomTopic);

        
    }

    const handleJoinRoom = () => {
        const roomId = inputRoomId.current.value;
        publish('game-list-board', JSON.stringify({username, roomTopic: roomId, type: "join-room"}))
        handleSubscribe(roomId);
    }

    return ( 
        <div >
            <GameListBoard payload={payload}/>
            Id pokoju: <input type="text" ref={inputRoomId}/><button onClick={handleJoinRoom}>Dołącz</button>

            <button onClick={createRoom}>+ Stwórz nowy pokój</button>
            <div>Game 1
                <button onClick={() => handleSubscribe('game1-chat')}>Dołącz</button>
            </div>
            <div>Game 2
                <button>Dołącz</button>
            </div>
            <div>Game 3
                <button>Dołącz</button>
            </div>
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
    addGameAction,
    getGameList
};

export default connect(mapStateToProps, mapDispatchToProps)(GameList);