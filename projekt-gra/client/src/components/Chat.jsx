import React, { useEffect, useRef, useState } from 'react';

const Chat = ({payload, username}) => {
    const [messages, setMessages] = useState([]);
    const chat = useRef(null);
    // const chat = document.getElementById("chat");
    // if (chat.current) {
    //   // chat.scrollTop = chat.scrollHeight;
    //   // chat.lastElementChild.scrollIntoView();
    //   console.log(chat.current.lastElementChild);
    // }
    

    useEffect(() => {
        if (payload.topic) {
          setMessages(messages => [...messages, payload])
        }
      }, [payload])

    const content = (messages) => {
        // console.log(messages);
        const m = messages.map(item => {
          if (item.message){
            if (item.type === "private-message") {
              return (<p className='green'>{`From ${item.username}: ${item.message}`}</p>)
            }
            else if (item.type === "private-message-sent") {
              return (<p className='lightgreen'>{`To ${item.username}: ${item.message}`}</p>)
            }
            else
              return (<p>{item.username}: {item.message}</p>)
          } else if (item.type){
            if ( item.type === "join-room")
              return (<p>{`[${item.username} joined the game]`}</p>)
            if (item.type === "leave-room")
              return (<p>{`[${item.username} left the game]`}</p>)
            }
            if (item.type === "win") {
              return (<p style={{color: "red"}}>
              {item.text}</p>)
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