import React, { useEffect, useRef, useState } from 'react';

const Chat = ({payload, username}) => {
    const [messages, setMessages] = useState([]);
    const chat = useRef(null);
    

    useEffect(() => {
        if (payload.topic) {
          setMessages(messages => [...messages, payload])
        }
      }, [payload])

    const content = (messages) => {
        console.log(messages);
        const m = messages.map(item => {
          const itemKey = Math.random().toString(16).substr(2, 8);
          if (item.message){
            if (item.type === "private-message") {
              return (<p key={itemKey} className='green'>{`From ${item.username}: ${item.message}`}</p>)
            }
            else if (item.type === "private-message-sent") {
              return (<p key={itemKey} className='lightgreen'>{`To ${item.username}: ${item.message}`}</p>)
            }
            else
              return (<p key={itemKey}>{item.username}: {item.message}</p>)
          } else if (item.type){
            if ( item.type === "join-room")
              return (<p key={itemKey} 
              >{`[${item.username} joined the game]`}</p>)
            if (item.type === "leave-room")
              return (<p key={itemKey} 
              >{`[${item.username} left the game]`}</p>)
            }
            if (item.type === "win") {
              return (<p key={itemKey}style={{color: "red"}}>{item.text}</p>)
            }
        })
        
          
          

        return m;
    }
    return ( 
        <div className="chat" ref={chat}>
            {content(messages)}
        </div>
     );
}
 
export default Chat;