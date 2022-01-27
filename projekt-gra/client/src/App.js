
import './App.css';
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
