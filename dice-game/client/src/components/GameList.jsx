import {v4 as uuidv4 } from 'uuid';
import { connect } from "react-redux";
import { addGame, getGameList, getGamesByName, getGamesById } from '../actions/gameActions';
import { getUserList} from '../actions/userActions';
import { useEffect } from 'react';
import { useRef } from 'react';
import GameListBoard from './GameListBoard';
import { addUserToGame } from '../actions/gameUserActions';
import { useState } from 'react';
import SettingsForm from './SettingsForm';
import LoggedInBoard from './LoggedInBoard';

const Cookies = require('js-cookie')

const GameList = ({users, games, client, subscribe, publish, disconnect, payload, username, setUsername, setTopic, addGame, getGameList, getUserList, addUserToGame, getGamesByName, getGamesById, unsubscribe}) => {
    const inputRoomId = useRef(null);
    const [changingSettings, setChangingSettings] = useState(false);
    const inputEl = useRef(null);
    const nameButton = useRef(null);
    const idButton = useRef(null);
    const [filterType, setFilterType] = useState('name');
    const [intervals, setIntervals] = useState([]);

    useEffect(() => {
        
        const interval = setInterval(() => {
            getGameList();
            getUserList();
        }, 1000);
        setIntervals([...intervals, interval]);
    }, [])

    const handleSubscribe = (topic) => {
        subscribe(topic);
        subscribe(client.options.clientId);
        
        setTopic(topic);
        unsubscribe('game-list-board');


        publish('game-list-board', JSON.stringify({username, roomTopic: topic, type: "join-room"}))
        publish(topic, JSON.stringify({username, roomTopic: topic, type: "join-room"}))

        const user = {
            userId: client.options.clientId,
            username: username,
            isPlayer: false,
            playerNr: '',
        }
        addUserToGame(topic, user);
        

        intervals.forEach(i => {
            clearInterval(i);
        })
    }

    const pointsInit = {
        '1': {value: 0, clicked: false},
        '2': {value: 0, clicked: false},
        '3': {value: 0, clicked: false},
        '4': {value: 0, clicked: false},
        '5': {value: 0, clicked: false},
        '6': {value: 0, clicked: false},
        'x3': {value: 0, clicked: false},
        'x4': {value: 0, clicked: false},
        'ma??y strit': {value: 0, clicked: false},
        'du??y strit': {value: 0, clicked: false}, 
        'genera??': {value: 0, clicked: false},
        'szansa': {value: 0, clicked: false}
    };

    const createRoom = () => {
        const roomTopic = "game_" + Math.random().toString(16).substr(2, 8);

        
        publish('game-list-board', JSON.stringify({username, roomTopic, type: "create-room"}))
        
        addGame({gameId: roomTopic, gameName: "Bez Nazwy", gameUsers: [],
        moves: [],
        board: {
            player1: pointsInit,
            player2: pointsInit
        },
        playerTurn: "player1",
        player1_id: '',
        player2_id: ''
        });
        Cookies.set('playerTurn', "player1")
        setFilterType('id')
        filter(roomTopic);
        
    }

    const handleJoinRoom = () => {
        const roomId = inputRoomId.current.value;
        
        const game = games.find(game => game.gameId === roomId);
        if (game){
            handleSubscribe(roomId);
            Cookies.set('playerTurn', game.playerTurn)
        }
        
    }

    const showAllGames = (games) => {
        const content = games.map(game => {
            return (
                <div key={game.gameId}>
                    <p>{game.gameName}</p>
                    <p className='small'>Id: {game.gameId}</p>
                    <button
                    onClick={() => handleSubscribe(`${game.gameId}`)}
                    >Do????cz</button>
                </div>
            )
        })

        return content;
    }

    const filter = (value) => {
        intervals.forEach(i => {
            clearInterval(i);
        })

        if (filterType === "name")
            getGamesByName(value);
        else if (filterType === "id")
            getGamesById(value);
    }

    const clearFilters = () => {
        const interval = setInterval(() => {
            getGameList();
            getUserList();
        }, 1000);
        setIntervals([...intervals, interval]);
    }

    const nameButtonClick = () => {
        setFilterType("name");
        nameButton.current.className = "active";
        idButton.current.className = "";
    }

    const idButtonClick = () => {
        setFilterType("id");
        idButton.current.className = "active";
        nameButton.current.className = "";
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
            <p>Nazwa u??ytkownika: {username}</p>
            <button onClick={disconnect}>Wyloguj</button>
            <button onClick={() => setChangingSettings(true)}>Zmie?? nazw??</button>
            {changingSettings && <SettingsForm user={user}
                setChangingSettings={setChangingSettings}
                setUsername={setUsername}
            />}
            <div className='boards'>
            <GameListBoard payload={payload}/>
            <LoggedInBoard users={users}/>
            </div>
            
            Id pokoju: <input type="text" ref={inputRoomId}/><button onClick={handleJoinRoom}>Do????cz</button>
            

            <button onClick={createRoom}>+ Stw??rz nowy pok??j</button>

            <div className='search'>
                <label>Szukaj: </label>
                <input type="text"
                    ref={inputEl}
                />
                <button onClick={() => filter(inputEl.current.value)}>Filtruj</button>
                <button onClick={nameButtonClick}
                ref={nameButton}>Po nazwie</button>
                <button onClick={idButtonClick}
                ref={idButton}>Po id</button>
                <button onClick={clearFilters}>Wyczy???? filtry</button>
            </div>
            

            <div className='game-list'>
            {showAllGames(games)}
            </div>
            
        </div>
     );
}
 
const mapStateToProps = (state) => {
    // console.log(state);
    return {
        games: state.games,
        users: state.users
    }
}

const mapDispatchToProps = {
    addGame,
    getGameList,
    getUserList,
    addUserToGame, 
    getGamesByName, 
    getGamesById
};

export default connect(mapStateToProps, mapDispatchToProps)(GameList);