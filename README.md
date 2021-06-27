
# Neurosity

This application is a web version of the classic board game: Mastermind! When the page loads, the user has the option to change the number of colored pegs in the hidden solution. THe game automatically creates a solution and hides the solution from the player. The player cycles through the possible color combinations and submits a guess. The game responds with small black, white or brown pegs. A black peg indicates the player has a peg of the correct color in the correct location. A white peg indicates the player has a correct color in an incorrect location. A brown peg indicates that there are pegs of the wrong color on the board.

This version of Mastermind! allows for up to 10 different colored pegs to be available. 

When the game is started the player can see a Bonus score slowly decrease as time goes on. Additionally, a timer is tracking the amount of time needed to solve the puzzle. After the puzzle is solved, the player is presented with their score and if the score is high enough, the player is prompted for their initials. The score is added to the high score list. The high scores can be viewed by clicking the High Score button. 

Heroku Link: 

New Game - this screenshot displays the game as it loads. On the right panel, the player can choose the number of colors, refresh the game, and see how many bonus points remain and how long the game has been played:

<img src="public/images/loading.png">

Game in Progress - this screenshot displays the game a in progress. The bonus score decreases as the time ticks:

<img src="public/images/game.png">

High Score - this screenshot displays the final score and the ability to save a high score. The user can only enter three initials and they are automatically capitalized:

<img src="public/images/highscore.png">

## Technologies

- Javascript
- HTML
- CSS
- Material UI
- React
- Express
- Node
- Postgres
