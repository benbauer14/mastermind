
# Neurosity

This application is a web version of the classic board game: Mastermind! When the page loads, the user has the option to change the number of colored pegs in the hidden solution. THe game automatically creates a solution and hides the solution from the player. The player cycles through the possible color combinations and submits a guess. The game responds with small black, white or brown pegs. A black peg indicates the player has a peg of the correct color in the correct location. A white peg indicates the player has a correct color in an incorrect location. A brown peg indicates that there are pegs of the wrong color on the board.

This version of Mastermind! allows for up to 10 different colored pegs to be available. 

When the game is started the player can see a Bonus score slowly decrease as time goes on. Additionally, a timer is tracking the amount of time needed to solve the puzzle. After the puzzle is solved, the player is presented with their score and if the score is high enough, the player is prompted for their initials. The score is added to the high score list. The high scores can be viewed by clicking the High Score button. 

Heroku Link: https://neurotype.herokuapp.com/

Admin Login - this screenshot displays all of the options available to an admin. Each role is conditionally rendered to provide access to allowed functions:

<img src="public/images/adminlogin.png">

## Technologies

- Javascript
- HTML
- CSS
- Material UI
- React
- Express
- Node
- Postgres
