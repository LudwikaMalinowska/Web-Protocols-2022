import { connect } from "react-redux";
import { useEffect} from 'react';
import { getGameUserList } from "../actions/gameUserActions";


const UsersInGameBox = ({gameUsers, getGameUserList, topic, username, publish, client}) => {

    useEffect(() => {
        setInterval(() => {
            getGameUserList(topic);
        }, 300000);
        
    }, [])

    const sendPrivateMessage = (user) => {
        const message = prompt(`Napisz wiadomość do ${user.username}`)
        // console.log(user);

        publish(client.options.clientId, JSON.stringify({username: user.username, topic: client.options.userId, type: "private-message-sent",
        message: message}))

        publish(user.userId, JSON.stringify({username, topic: user.userId, type: "private-message",
        message: message}))
    }

    const content = gameUsers.map(user => (<p onClick={()=> sendPrivateMessage(user)}>{user.username}</p>))

    return ( 
        <div className='users-in-game-box'>
        <h5>Użytkownicy w grze</h5>
            {content}
        </div>
     );
}


const mapStateToProps = (state, props) => {
    // console.log("state:", state);
    // const gameId = props.match.params.gameId;
    // console.log("props:", props);
    return {
        gameUsers: state.gameUsers
    }
}

const mapDispatchToProps = {
    getGameUserList
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersInGameBox);