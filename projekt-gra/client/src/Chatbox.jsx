import "./chatbox.css";


const Chatbox = () => {
    
    return ( 
       <div className="chatbox">
           <div className="chat"></div>
           <input type="text" className="message-input" placeholder="Write message..."/>
       </div>
     );
}

export default Chatbox;
 