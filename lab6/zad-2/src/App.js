import logo from './logo.svg';
import './App.css';
const Cookies = require('js-cookie')

function App() {

  
    let welcomeText = "";
    const surname = Cookies.get('surname');
    console.log(surname);

    if (surname === undefined) {
        const name = prompt("Podaj imię i nazwisko")
        Cookies.set('surname', name)

        welcomeText = "Hello world";
    }
    else {
      welcomeText = `Witaj ${surname}`
    }


    



  return (
    <div className="App">
      <h2>{welcomeText}</h2>
    </div>
  );
}

export default App;
