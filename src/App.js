import './App.css';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import React from 'react'
import {HiOutlineRefresh} from 'react-icons/hi'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';




function App() {
  const [guessHistory, setGuessHistory] = useState([])
  const [guessCount, setGuessCount] = useState(0)
  const [loc1, setLoc1] = useState("grey")
  const [loc2, setLoc2] = useState("grey")
  const [loc3, setLoc3] = useState("grey")
  const [loc4, setLoc4] = useState("grey")
  const [solution, setSolution] = useState('')
  const [timer, setTimer] = useState(0)
  const [score, setScore] = useState(5000)
  const [colors, setColors] = useState(6)
  const [dialogHeader, setDialogHeader] = useState('High Scores')
  const [initials, setInitials] = useState(null)
  const [highscores, setHighscores] = useState([])
 
  const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);
  
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

  const generateSolution = (numofcolors) => {
    //takes a random number and translates the number into a preassigned value. 
    // A total of four random values are selected and the solution is generated.
    let solutionObject = {}
    for(let i = 1; i < 5; i++){
      let randColorNum = Math.floor(Math.random()*numofcolors + 1)
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
          default:
            //no default
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

  const setColorsFunc = (numofcolors) => {
    setColors(numofcolors);
    console.log(colors)
    generateSolution(numofcolors)
  }

  const addGuess = (guess) =>{

        //starts bonus counter and generates solution if guess is 0
    if(guessCount === 0){
      startScore()
     }

      let guessArray = Object.values(guess)
      let solutionArray = Object.values(solution)
      let whitepegs = 0
  
  
      if(guess.l1 === "grey" || guess.l2 === "grey" || guess.l3 === "grey" || guess.l4 === "grey"){
        swal("Please enter a valid guess!", "Click the circles on the gameboard to change the color.");
        return null
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
        setDialogHeader("Winner!")
        handleClickOpen()
        history.push(guesswithright)
        setGuessHistory(history)
        clearInterval(window.timertracker)
        clearInterval(window.interval)
        console.log(guessHistory)
      }else if(guessCount >= 9){
        setDialogHeader("Loser!")
        handleClickOpen()
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
          default:
            //no default
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
    generateSolution(colors)
  }

  const highscoreClick = () => {
    axios.get('/api/highscore').then((response) =>{
      setDialogHeader('High Scores')
      setHighscores(response.data.rows)
      handleClickOpen()
    }).catch((err) => {
      console.log(err)
    })

  }

  const postHighScore = (total) =>{

    axios.post('/api/highscore',{
      name: initials,
      score: total,
      colors: colors,
      time: timer
    }).then((response) =>{
    console.log(response)
    setDialogHeader(null)
    handleClose()
    }).catch((err) =>{
    console.log(err)
  })
    }

  const dialogBody = () => {
    if(dialogHeader === "High Scores"){
      return(
        <table>
        <thead>
        <th className="place"></th><th>Name</th><th>Colors</th><th>Time</th><th>Score</th>
        </thead>
        {highscores.map((highscore, index) => {
          return(<tr><td>{index + 1}</td><td>{highscore.name}</td><td>{highscore.colors}</td><td>{highscore.time}s</td><td>{highscore.score}</td></tr>)
        })}
      </table>
      )
    }else if(dialogHeader === "Winner!"){
      let total = (10000 * colors - (timer * 250) + 1*score)
      if(total > highscores[9].score){
        return(
          <>
          <DialogContent dividers>
          <Typography>You are a Mastermind!</Typography>
          
          <br></br>
          <Typography>Time: {timer}s</Typography>
          <Typography>Colors: {colors}s</Typography>
          <Typography>Bonus: {score}</Typography>
          <br></br>
          <Typography><center>Score</center></Typography>
          <Typography>(10000 x Colors) - (250 x Time) + Bonus</Typography>
          <Typography><center><h2>{total}</h2></center></Typography>
          <br></br>
          <Typography>You have a highscore! Please enter your initials.</Typography>
          
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Initials"
            type="initials"
            value={initials}
            onChange={(e) => setInitials(e.target.value)}
            inputProps={{maxLength: 3, style: { textTransform: "uppercase" } }}
            fullWidth
          />
            </DialogContent>
            <DialogActions>
            <Button onClick={() => postHighScore(total)}>
              OK
            </Button>
            </DialogActions>          
          </>
        )
        }else{
          return(
            <>
            <DialogContent dividers>
            <Typography>You are a Mastermind! Congrats!</Typography>
            <br></br>
            <Typography>Time: {timer}s</Typography>
            <Typography>Colors: {colors}s</Typography>
            <Typography>Bonus: {score}</Typography>
            <br></br>
            <Typography><center>Score</center></Typography>
            <Typography>(10000 x Colors) - (25 x Time) + Bonus</Typography>
            <Typography><center><h2>{total}</h2></center></Typography>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => handleClose()} color="primary">
              OK
            </Button>
          </DialogActions>
            </>
          )
        }
    }else if(dialogHeader === "Loser!"){
      return(
        <Typography>You are have much work to do to become the Mastermind! Fail!</Typography>
      )
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
    generateSolution(6)
    axios.get('/api/highscore').then((response) =>{
      setHighscores(response.data.rows)
    }).catch((err) => {
      console.log(err)
    })

  }, []);

  return (
    <div className="App">
      <header className="App-header">
      <div className="main">
        {/* <div></div> */}
        <div className="header">
        <h1 aria-label="Mastermind!"> </h1>
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
        <p>Colors:</p><select value={colors} onChange={(event) => setColorsFunc((event.target.value))}>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
          <option value='6'>6</option>
          <option value='7'>7</option>
          <option value='8'>8</option>
          <option value='9'>9</option>
          <option value='10'>10</option>
        </select>
        </span>
        <hr></hr>

        <p style={{fontSize: '30px'}} className="iconButtons" onClick={() => {resetGame()}}><HiOutlineRefresh /></p>
        <hr></hr>
        <p className="iconButtons" onClick={highscoreClick}>High Scores</p>
      </div>
      </div>
      </header>
      <div>
        {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Open dialog
        </Button> */}
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            {dialogHeader}
          </DialogTitle>
          <DialogContent dividers>
            {dialogBody()}
          </DialogContent>
        </Dialog>
      </div>
    </div>



);
}

export default App;
