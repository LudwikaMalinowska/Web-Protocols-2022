import React, { useEffect, useRef, useState } from 'react';

const GameListBoard = ({payload}) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (payload.topic) {
          setMessages(messages => [...messages, payload])
        }
      }, [payload])
    
    const content = (messages) => {
        
        const m = messages.map(item => {
            const itemKey = Math.random().toString(16).substr(2, 8);
            if (item.type === "create-room"){
                return (<p key={itemKey}
                >[Gracz {item.username} utworzył pokój o id: 

                <br/>{item.roomTopic}]</p>);
            } else if (item.type === "join-room") {
                return (<p key={itemKey}
                >[[ Gracz {item.username} dołączył do pokoju o id: <br/> {item.roomTopic}]]</p>)
            }
            else if (item.type === "log-in") {
                return (<p key={itemKey}
                >{`[${item.username} zalogował się.]`}</p>)
            }
        } )

        return m;
    }

    return ( 
        <div className='game-list-board'>
            {content(messages)}
        </div>
     );
}
 
export default GameListBoard;