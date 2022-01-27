import React, { useEffect, useRef, useState } from 'react';

const GameListBoard = ({payload}) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        console.log(payload);
        if (payload.topic) {
          setMessages(messages => [...messages, payload])
        }
      }, [payload])
    
    const content = (messages) => {
        console.log(messages);
        const m = messages.map(item => {
            if (item.type === "create-room"){
                return (<p>[Gracz {item.username} utworzył pokój o id: 

                <br/>{item.roomTopic}]</p>);
            } else if (item.type === "join-room") {
                return (<p>[[ Gracz {item.username} dołączył do pokoju o id: <br/> {item.roomTopic}]]</p>)
            }
            else if (item.type === "log-in") {
                return (<p>{`[${item.username} zalogował się.]`}</p>)
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