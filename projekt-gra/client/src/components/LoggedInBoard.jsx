const LoggedInBoard = ({users}) => {

    const content = users.map(user => (
        <p>{user.username}</p>
    ))
    return ( 
        <div className="logged-in-board">
            <h5>Zalogowani użytkownicy</h5>
            {content}
        </div>
     );
}
 
export default LoggedInBoard;