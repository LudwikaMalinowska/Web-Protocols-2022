import Chat from "./Chat";
import "./chatbox.css";


const Chatbox = ({topic, publish, payload}) => {
    
    const handleKeyPress = (e) => {
        const key = e.key;
        
        if (key === "Enter") {
            const message = e.target.value;
            console.log(message);
            publish(topic, message);
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
 