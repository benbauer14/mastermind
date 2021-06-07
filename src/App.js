import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [guessHistory, setGuessHistory] = useState({
    guess1: "",
    guess2: "",
    guess3: "",
    guess4: "",
    guess5: "",
    guess6: "",
    guess7: "",
    guess8: "",
    guess9: ""
  })
  const guesses = () => {

  }

  return (
    <div className="App">
      <header className="App-header">
      <div className="main">
        <h2>Mastermind!</h2>
        <div className="g10"></div>
        <div className="g9"></div>
        <div className="g8"></div>
        <div className="g7"></div>
        <div className="g6"></div>
        <div className="g5"></div>
        <div className="g4"></div>
        <div className="g3"></div>
        <div className="g2"></div>
        <div className="g1"></div>

      <div className="guess">
        <span id="dot1" className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
        <button>Submit</button>
      </div>
      </div>
      </header>
    </div>
  );
}

export default App;
