import React, { useEffect, useState } from 'react';

const Chat = ({payload}) => {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        if (payload.topic) {
          setMessages(messages => [...messages, payload])
        }
      }, [payload])

    const content = (messages) => {
        const m = messages.map(item => (<p>{item.message}</p>))

        return m;
    }
    return ( 
        <div className="chat">
            {content(messages)}
        </div>
     );
}
 
export default Chat;