
import './App.css';
import Board from './Board';
import Chatbox from './Chatbox';


function App() {
  return (
    <div className="App">
      <p>Client</p>
      <p>Gra kości</p>
      <div className="game-box">
      <Board/>
      <Chatbox/>
      </div>
      
    </div>
  );
}

export default App;
