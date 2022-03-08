import Chat from "./Chat";
import "./../chatbox.css";


const Chatbox = ({topic, publish, payload, username, unsubscribe, intervals, intervals2}) => {
    
    const handleKeyPress = (e) => {
        const key = e.key;
        
        if (key === "Enter") {
            const message = e.target.value;
            
            publish(topic, JSON.stringify({username, message}));
        }
    }

    return ( 
       <div className="chatbox">
           <Chat payload={payload} 
           unsubscribe={unsubscribe}
           intervals={intervals}
            intervals2={intervals2}
           />
           <input type="text" className="message-input" placeholder="Write message..."
            onKeyPress={handleKeyPress}
           />
       </div>
     );
}

export default Chatbox;
 