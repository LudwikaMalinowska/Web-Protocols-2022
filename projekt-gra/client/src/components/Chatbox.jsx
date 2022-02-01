import Chat from "./Chat";
import "./../chatbox.css";


const Chatbox = ({topic, publish, payload, username}) => {
    
    const handleKeyPress = (e) => {
        const key = e.key;
        
        if (key === "Enter") {
            const message = e.target.value;
            
            publish(topic, JSON.stringify({username, message}));
        }
    }

    return ( 
       <div className="chatbox">
           <Chat payload={payload}/>
           <input type="text" className="message-input" placeholder="Write message..."
            onKeyPress={handleKeyPress}
           />
       </div>
     );
}

export default Chatbox;
 