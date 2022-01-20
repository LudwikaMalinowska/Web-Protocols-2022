import {v4 as uuidv4 } from 'uuid';
import { connect } from "react-redux";
import { addGameAction, getGameList } from '../actions/gameActions';
import { useEffect } from 'react';

const GameList = ({subscribe, setTopic, addGameAction, getGameList}) => {
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
        handleSubscribe(roomTopic);
        addGameAction(roomTopic);
    }
    return ( 
        <div >
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