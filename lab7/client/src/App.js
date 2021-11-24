import logo from './logo.svg';
import './App.css';



import { io } from "socket.io-client";

const socket = io("ws://localhost:8080", 
{  
  withCredentials: true,  
extraHeaders: {    "my-custom-header": "abcd"  }
});

socket.on("connect", () => {  
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});




function App() {
  return (
    <div className="App">
      <p>Client</p>
    </div>
  );
}

export default App;
