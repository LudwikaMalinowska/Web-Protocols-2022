
import './App.css';
import Board from './Board';
import Chatbox from './Chatbox';
import Connect from './components/Connect';
import HookMqtt from './components/HookMqtt';

function App() {
  return (
    <div className="App">
      <p>Client</p>
      <p>Gra kości</p>
      
      {/* <Board/>
      <Chatbox/> */}
      <HookMqtt/>
      
      
    </div>
  );
}

export default App;
