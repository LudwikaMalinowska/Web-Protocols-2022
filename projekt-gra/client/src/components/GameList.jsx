import {v4 as uuidv4 } from 'uuid';
import { connect } from "react-redux";
import { addGame, getGameList } from '../actions/gameActions';
import { getUserList} from '../actions/userActions';
import { useEffect } from 'react';
import { useRef } from 'react';
import GameListBoard from './GameListBoard';
import { addUserToGame } from '../actions/gameUserActions';
import { useState } from 'react';
import SettingsForm from './SettingsForm';

const GameList = ({games, client, subscribe, publish, disconnect, payload, username, setUsername, setTopic, addGame, getGameList, getUserList, addUserToGame}) => {
    const inputRoomId = useRef(null);
    const [changingSettings, setChangingSettings] = useState(false);
    
    

    useEffect(() => {
        setInterval(() => {
            getGameList();
            getUserList();
        }, 300000);
    }, [])

    const handleSubscribe = (topic) => {
        subscribe(topic);
        subscribe(client.options.clientId);
        console.log("Subscribed to " + topic);
        setTopic(topic);
        //adduser

        const user = {
            userId: client.options.clientId,
            username: username,
            password: client.options.password
        }
        addUserToGame(topic, user);
        publish(topic, JSON.stringify({username, roomTopic: topic, type: "join-room"}))
        
    }

    const createRoom = () => {
        const roomTopic = "game" + uuidv4()

        console.log("roomTopic: ", roomTopic);
        publish('game-list-board', JSON.stringify({username, roomTopic, type: "create-room"}))
        handleSubscribe(roomTopic);
        addGame({gameId: roomTopic, gameName: "Bez Nazwy"});
        
    }

    const handleJoinRoom = () => {
        const roomId = inputRoomId.current.value;
        handleSubscribe(roomId);
        publish(roomId, JSON.stringify({username, roomTopic: roomId, type: "join-room"}))
        
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
    

    let user = {};
    if (client){
        user = {
            userId: client.options.clientId,
            username: username,
            password: client.options.password
        }
    }

    return ( 
        <div >
            <p>Nazwa użytkownika: {username}</p>
            <button onClick={disconnect}>Wyloguj</button>
            <button onClick={() => setChangingSettings(true)}>Zmień nazwę</button>
            {changingSettings && <SettingsForm user={user}
                setChangingSettings={setChangingSettings}
                setUsername={setUsername}
            />}
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
        games: state.games,
        users: state.users
    }
}

const mapDispatchToProps = {
    addGame,
    getGameList,
    getUserList,
    addUserToGame
};

export default connect(mapStateToProps, mapDispatchToProps)(GameList);