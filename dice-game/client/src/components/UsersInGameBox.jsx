import { connect } from "react-redux";
import { getGameUserList } from "../actions/gameUserActions";


const UsersInGameBox = ({gameUsers, getGameUserList, topic, username, publish, client}) => {


    const sendPrivateMessage = (user) => {
        const message = prompt(`Napisz wiadomość do ${user.username}`)

        publish(client.options.clientId, JSON.stringify({username: user.username, topic: client.options.userId, type: "private-message-sent",
        message: message}))

        publish(user.userId, JSON.stringify({username, topic: user.userId, type: "private-message",
        message: message}))
    }

    const content = gameUsers.map(user => {
        const randKey = Math.random().toString(16).substr(2, 8);
        const playerText = (user.isPlayer) ? `(${user.playerNr})` : '';
        return (<p 
        key={randKey}
        onClick={()=> sendPrivateMessage(user)}>{user.username} {playerText}</p>)
    })

    return ( 
        <div className='users-in-game-box'>
        <h5>Użytkownicy w grze</h5>
            {content}
        </div>
     );
}


const mapStateToProps = (state) => {
    return {
        gameUsers: state.gameUsers
    }
}

const mapDispatchToProps = {
    getGameUserList
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersInGameBox);