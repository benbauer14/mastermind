import './App.css';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import React from 'react'
import {HiOutlineRefresh} from 'react-icons/hi'
import {FaStop} from 'react-icons/fa'


function App() {
  const [guessHistory, setGuessHistory] = useState([])
  const [guessCount, setGuessCount] = useState(0)
  const [loc1, setLoc1] = useState("grey")
  const [loc2, setLoc2] = useState("grey")
  const [loc3, setLoc3] = useState("grey")
  const [loc4, setLoc4] = useState("grey")
  const [solution, setSolution] = useState({})
  const [timer, setTimer] = useState(0)
  const [score, setScore] = useState(5000)
  const [colors, setColors] = useState(6)
 


  const generateSolution = () => {
    //takes a random number and translates the number into a preassigned value. 
    // A total of four random values are selected and the solution is generated.
    let solutionObject = {}
    for(let i = 1; i < 5; i++){
      let randColorNum = Math.floor(Math.random()*colors + 1)
        switch(randColorNum){
          case 1:
            solutionObject['l'+i] = "red"
            break;
          case 2: 
            solutionObject['l'+i] = "blue"
            break;
          case 3:
            solutionObject['l'+i] = "green"
            break;
          case 4:
            solutionObject['l'+i] = "yellow"
            break;
          case 5:
            solutionObject['l'+i] = "black"
            break;
          case 6:
            solutionObject['l'+i] = "white"
            break;
          case 7:
            solutionObject['l'+i] = "orange"
            break;
          case 8:
            solutionObject['l'+i] = "purple"
            break;
          case 9:
            solutionObject['l'+i] = "neongreen"
            break;
          case 10:
            solutionObject['l'+i] = "neonpink"
            break;
        }
    }
    console.log(solutionObject)
    setSolution(solutionObject)
  }


const startScore = () => {
  let starttime = (Date.now());

  window.interval = setInterval(function() {
      var elapsedTime = Date.now() - starttime;
      let calcscore = (5000 - ((elapsedTime / 1000).toFixed(2)) * 100).toFixed(0);
      if(calcscore <= 0){
        setScore(0)
        clearInterval(window.interval)
      }else{
        setScore(calcscore)
      }
  }, 10);
window.timertracker = setInterval(function() {
    var elapsedTimer = Date.now() - starttime;
      setTimer((elapsedTimer / 1000).toFixed(0))

}, 1000);

}


  const addGuess = (guess) =>{
    //extract the values from guess and solution

    let guessArray = Object.values(guess)
    let solutionArray = Object.values(solution)
    let whitepegs = 0


    if(guess.l1 === "grey" || guess.l2 === "grey" || guess.l3 === "grey" || guess.l4 === "grey"){
      swal("Please enter a valid guess!", "Click the circles on the gameboard to change the color.");
      return null
    }

    //starts bonus counter if guess is 0
    if(guessCount === 0){
      startScore()
      generateSolution()
    }

    //combine values into a single array with duplicates
    for(let i=0; i < solutionArray.length; i++){
      for (let j=guessArray.length; j> -1;j--){
        if(solutionArray[i] === guessArray[j]){
          guessArray.splice(j,1)
          whitepegs += 1
          break
        }
      }
    }
    //determine black pegs
    let blackpegs = 0
    if(solution.l1 === guess.l1){
      blackpegs += 1
    }
    if(solution.l2 === guess.l2){
      blackpegs += 1
    }
    if(solution.l3 === guess.l3){
      blackpegs += 1
    }
    if(solution.l4 === guess.l4){
      blackpegs += 1
    }
    console.log("black", blackpegs, "white", whitepegs - blackpegs)
    setGuessCount(guessCount +1)
    let history = guessHistory
    //add blackpeg and whitepeg count to guess
    let guesswithright = guess
    guesswithright['blackpeg'] = blackpegs
    guesswithright['whitepeg'] = whitepegs - blackpegs

    if(blackpegs === 4){
      swal("Winner!!", "You are a Mastermind! Congrats!");
      history.push(guesswithright)
      setGuessHistory(history)
      clearInterval(window.timertracker)
      clearInterval(window.interval)
      console.log(guessHistory)
    }else if(guessCount >= 9){
      swal("Loser!!", "You are have much work to do to become the Mastermind! Fail!");
      history.push(guesswithright)
      clearInterval(window.timertracker)
      clearInterval(window.interval)
      console.log(guessHistory)
    }else{
    history.push(guesswithright)
    setGuessHistory(history)
    console.log(guessHistory)
    }
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
    if(currentColor === "grey"){
      newColor = "red"
    }else if(currentColor === "red"){
      newColor = "blue"
    }else if(currentColor === "blue"){
      newColor = "green"
    }else if(currentColor === "green"){
      if(colors >=4){
        newColor = "yellow"
      }else{
        newColor = "red"
      }
    }else if(currentColor === "yellow"){
      if(colors >=5){
        newColor = "black"
      }else{
        newColor = "red"
      }
    }else if(currentColor === "black"){
      if(colors >=6){
        newColor = "white"
      }else{
        newColor = "red"
      }
    }else if( currentColor === "white"){
      if(colors >=7){
        newColor = "orange"
      }else{
        newColor = "red"
      }
    }else if( currentColor === "orange"){
      if(colors >=8){
        newColor = "purple"
      }else{
        newColor = "red"
      }
    }else if( currentColor === "purple"){
      if(colors >=9){
        newColor = "greenyellow"
      }else{
        newColor = "red"
      }
    }else if( currentColor === "greenyellow"){
      if(colors >=10){
        newColor = "magenta"
      }else{
        newColor = "red"
      }
    }else if( currentColor === "magenta"){
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

  const pauseGame = () => {

  }

  const resetGame = () => {
    clearInterval(window.interval)
    clearInterval(window.timertracker)
    setGuessHistory([])
    setGuessCount(0)
    setLoc1("grey")
    setLoc2("grey")
    setLoc3("grey")
    setLoc4("grey")
    setSolution({})
    setTimer(0)
    setScore(5000)

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
        {/* <div></div> */}
        <div className="header">
        <h1 aria-label="Mastermind!"></h1>
        </div>
        <div></div>
        {/* <div className="scoreshistory">test</div> */}
      <div className="gameboard">
        <div className="pastguesses">
        {guessHistory.map((hist,index) => {
          let bandw = {}
          let bandwcount = 1
          for(let i=0; i<hist.blackpeg; i++){
            bandw['p' + bandwcount] = 'black'
            bandwcount = bandwcount + 1
          }
          for(let i=0; i<hist.whitepeg; i++){
            bandw['p' + bandwcount] = 'white'
            bandwcount += 1
          }
          for(let i=bandwcount; i<5; i++){
            bandw['p' + bandwcount] = 'brown'
            bandwcount += 1
          }

        return(
          <div className="guesseshistory">
            <div className="rowcount">{index + 1}</div>
            <div className="colors">
              <span style={{backgroundColor: hist.l1}} className="dot"></span>
              <span style={{backgroundColor: hist.l2}} className="dot"></span>
              <span style={{backgroundColor: hist.l3}} className="dot"></span>
              <span style={{backgroundColor: hist.l4}} className="dot"></span>
            </div>
            <div className="bandw">
              <span style={{backgroundColor: bandw.p1}} className="smalldot"></span>
              <span style={{backgroundColor: bandw.p2}} className="smalldot"></span>
              <span style={{backgroundColor: bandw.p3}} className="smalldot"></span>
              <span style={{backgroundColor: bandw.p4}} className="smalldot"></span>
            </div>
          </div>
        )
      })}
      
        </div>
      <div className="guess">
          <div className="rowcount">?</div>
          <div>
          {currentGuess()}
          </div>
          <div>

          <button onClick={() => addGuess({l1: loc1, l2: loc2, l3:loc3, l4:loc4})}>?</button>
          </div>
      </div>
      </div>
      <div className="rightscore">
        <p>Bonus: {score}</p>
        <p>Time: {timer}</p>
        <span style={{display: 'inline-flex'}}>
        <p>Colors:</p><select onChange={(event) => setColors(event.target.value)}>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
          <option value='6' defaultValue selected>6</option>
          <option value='7'>7</option>
          <option value='8'>8</option>
          <option value='9'>9</option>
          <option value='10'>10</option>
        </select>
        </span>
        <hr></hr>

        <p style={{fontSize: '30px'}} className="iconButtons" onClick={() => {resetGame()}}><HiOutlineRefresh /></p>
        <hr></hr>
        <p className="iconButtons">High Scores</p>
      </div>
      </div>
      </header>
    </div>
  );
}

export default App;
