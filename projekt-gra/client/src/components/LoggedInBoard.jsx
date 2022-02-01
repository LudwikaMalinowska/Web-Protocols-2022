const LoggedInBoard = ({users}) => {

    const content = users.map(user => {
        const k = Math.random().toString(16).substr(2, 8);
        return (
            <p key={k}
            >{user.username}</p>
        )
    } )
    return ( 
        <div className="logged-in-board">
            <h5>Zalogowani użytkownicy</h5>
            {content}
        </div>
     );
}
 
export default LoggedInBoard;