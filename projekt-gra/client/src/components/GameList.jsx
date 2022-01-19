const GameList = ({subscribe, setTopic}) => {
    const handleSubscribe = (topic) => {
        subscribe(topic);
        console.log("Subscribed to " + topic);
        setTopic(topic);
    }
    return ( 
        <div >
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
 
export default GameList;