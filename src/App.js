import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [guessHistory, setGuessHistory] = useState({})
  const [guessCount, setGuessCount] = useState(0)
  const [loc1, setLoc1] = useState(0)
  const [loc2, setLoc2] = useState(0)
  const [loc3, setLoc3] = useState(0)
  const [loc4, setLoc4] = useState(0)
  const guesses = () => {
    return(
      <>
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
      </>
    )
  }
  const addGuess = () =>{

  }

  const cycleColor = (location) => {
    let currentColor = ""
    for(let i = 1; i < 5; i++){
      switch(i){
        case 1:
          curentColor = loc1
          break;
        case 2: 
          currentColor = loc2
          break;
        case 3:
          currentColor = loc3
          break;
        case 4:
          currentColor = loc4
          break;
      }
    }
  }

  const currentGuess = () =>{
    return(<>
          <span onClick={cycleColor(1)} className="dot"></span>
\         <span onClick={cycleColor(2)} className="dot"></span>
          <span onClick={cycleColor(3)} className="dot"></span>
          <span onClick={cycleColor(4)} className="dot"></span>
        </>)
  }

  return (
    <div className="App">
      <header className="App-header">
      <div className="main">
        <h2>Mastermind!</h2>
        {guesses()}

      <div className="guess">
        {currentGuess()}
        <button onClick={addGuess()}>Submit</button>
      </div>
      </div>
      </header>
    </div>
  );
}

export default App;
