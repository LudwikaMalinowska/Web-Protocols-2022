import {v4 as uuidv4 } from 'uuid';
import { connect } from "react-redux";
import { addGame, getGameList } from '../actions/gameActions';
import { useEffect } from 'react';
import { useRef } from 'react';
import GameListBoard from './GameListBoard';

const GameList = ({games, client, subscribe, publish, payload, username, setTopic, addGame, getGameList}) => {
    const inputRoomId = useRef(null);
    

    useEffect(() => {
        getGameList();
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
        addGame({gameId: roomTopic});

        
    }

    const handleJoinRoom = () => {
        const roomId = inputRoomId.current.value;
        publish('game-list-board', JSON.stringify({username, roomTopic: roomId, type: "join-room"}))
        handleSubscribe(roomId);
    }

    const showAllGames = (games) => {
        const content = games.map(game => {
            return (
                <div>
                    <p>Id: {game.gameId}</p>
                    <button
                    onClick={() => handleSubscribe(`${game.gameId}`)}
                    >Dołącz</button>
                </div>
            )
        })

        return content;
    }

    return ( 
        <div >
            <GameListBoard payload={payload}/>
            Id pokoju: <input type="text" ref={inputRoomId}/><button onClick={handleJoinRoom}>Dołącz</button>

            <button onClick={createRoom}>+ Stwórz nowy pokój</button>


            {showAllGames(games)}
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
    addGame,
    getGameList
};

export default connect(mapStateToProps, mapDispatchToProps)(GameList);