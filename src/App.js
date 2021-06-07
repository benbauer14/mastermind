import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [guessHistory, setGuessHistory] = useState({})
  const [guessCount, setGuessCount] = useState(0)
  const [loc1, setLoc1] = useState("blue")
  const [loc2, setLoc2] = useState("grey")
  const [loc3, setLoc3] = useState("grey")
  const [loc4, setLoc4] = useState("grey")
  const [solution, setSolution] = useState({})

  const generateSolution = () => {
    let solutionObject = {}
    for(let i = 1; i < 5; i++){
      let randColorNum = Math.floor(Math.random()*6 + 1)
        switch(randColorNum){
          case 1:
            solutionObject[i] = "r"
            break;
          case 2: 
            solutionObject[i] = "b"
            break;
          case 3:
            solutionObject[i] = "g"
            break;
          case 4:
            solutionObject[i] = "y"
            break;
          case 5:
            //using x for black
            solutionObject[i] = "x"
            break;
          case 6:
            solutionObject[i] = "w"
            break;
        }
    }
    console.log(solutionObject)
  }
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
    // if guessCount === 10 {
    //   //last guess
    // }
  }
  

  const cycleColor = (location) => {
    let currentColor = ""
    let newColor = ""
    for(let i = 1; i < 5; i++){
      if(i === location){
        switch(i){
          case 1:
            currentColor = loc1
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
    if(currentColor === ""){
      newColor = "red"
    }else if(currentColor === "red"){
      newColor = "blue"
    }else if(currentColor === "blue"){
      newColor = "green"
    }else if(currentColor === "green"){
      newColor = "yellow"
    }else if(currentColor === "yellow"){
      newColor = "black"
    }else if(currentColor === "black"){
      newColor = "white"
    }else if( currentColor === "white"){
      newColor = "red"
    }
    if(location === 1){
      setLoc1(newColor)
    }else if(location === 2){
      setLoc2(newColor)
    }else if(location === 3){
      setLoc3(newColor)
    }else{
      setLoc4(newColor)
    }
  }

  const currentGuess = () =>{
    return(<>
          <span style={{backgroundColor: loc1}} onClick={() => cycleColor(1)} className="dot"></span>
          <span style={{backgroundColor: loc2}} onClick={() => cycleColor(2)} className="dot"></span>
          <span style={{backgroundColor: loc3}} onClick={() => cycleColor(3)} className="dot"></span>
          <span style={{backgroundColor: loc4}} onClick={() => cycleColor(4)} className="dot"></span>
        </>)
  }

  useEffect(() => {
    generateSolution()
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      <div className="main">
        <h2>Mastermind!</h2>
        {guesses()}

      <div className="guess">
        {currentGuess()}
        <button onClick={() => addGuess()}>Submit</button>
      </div>
      </div>
      </header>
    </div>
  );
}

export default App;
