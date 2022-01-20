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
        console.log(messages);
        const m = messages.map(item => (<p>{item.username}: {item.message}</p>))

        return m;
    }
    return ( 
        <div className="chat" ref={chat}>
            {content(messages)}
        </div>
     );
}
 
export default Chat;