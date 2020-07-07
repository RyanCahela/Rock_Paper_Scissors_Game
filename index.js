(function RockPaperScissorsGame() {
  //init the app

  const SCORE_TO_WIN = 5;
  
  //cache elements
  const elOpponentScore = document.querySelector(".js-opponent-score");
  const elOpponentGuess = document.querySelector(".js-opponent-guess");
  const elPlayerScore = document.querySelector(".js-player-score");
  const elPlayerGuess = document.querySelector(".js-player-guess");
  const btnRock = document.querySelector(".js-rock-btn");
  const btnPaper = document.querySelector(".js-paper-btn");
  const btnScissors = document.querySelector(".js-scissors-btn");
  const textOutput = document.querySelector(".js-text-output");

  //add btn listeners
  btnRock.addEventListener("click", handlePlayerInput);
  btnPaper.addEventListener("click", handlePlayerInput);
  btnScissors.addEventListener("click", handlePlayerInput);

  //internal data
  let opponentScore = 0;
  let opponentGuess = "";
  let playerScore = 0;
  let playerGuess = "";
  let message = "";
  
  function processInput(playerGuess) {
    opponentGuess = getOpponentGuess();
    console.log(opponentGuess);
    if (playerGuess === opponentGuess) {
      message = "Players guessed the same thing";
    }
    //Rock
    if (playerGuess === "rock") {
      if (opponentGuess === "paper") {
        increaseOpponentScore();
      }

      if (opponentGuess === "scissors") {
        increasePlayerScore();  
      }
    };

    //Paper
    if (playerGuess === "paper") {
      if (opponentGuess === "scissors") {
        increaseOpponentScore();
      }

      if (opponentGuess === "rock") {
        increasePlayerScore();
      }
    }

    //Scissors
    if (playerGuess === "scissors") {
      if (opponentGuess === "rock") {
        increaseOpponentScore();
      }

      if (opponentGuess === "paper") {
        increasePlayerScore();
      }
    }
    checkForWin();  
    updateDOM();
  }

  function handlePlayerInput(e) {
    playerGuess = e.target.dataset.weapon;
    processInput(playerGuess);
  }

  function getOpponentGuess() {
    let guess = Math.floor(Math.random() * 3);
    switch(guess) {
      case 0:
        return "rock";
      case 1:
        return "paper";
      case 2:
        return "scissors";
      default:
        console.error("can't get opponent guess.");
    }
  }

  function checkForWin() {
    if (playerScore === SCORE_TO_WIN) {
      resetGame();
    }

    if (opponentScore === SCORE_TO_WIN) {
      resetGame();
    }
  }

  function resetGame() {
    message = "Game Over!";
    playerScore = 0;
    opponentScore = 0;
    playerGuess = "";
    opponentGuess = "";
  }

  function updateDOM() {
    updateTextMessage(message);
    updateScores(opponentScore, playerScore);
    updateGuesses(opponentGuess, playerGuess);
  }

  function updateScores(opponentScore, playerScore) {
    elOpponentScore.textContent = `Opponent Score: ${opponentScore}`;
    elPlayerScore.textContent = `Player Score: ${playerScore}`;
  }

  function updateGuesses(opponentGuess, playerGuess) {
    elOpponentGuess.textContent = opponentGuess;
    elPlayerGuess.textContent = playerGuess;
  }
  
  function updateTextMessage(message) {
    textOutput.textContent = message;
  }

  function increasePlayerScore() {
    message = "You won this round!";
    playerScore = increaseByOne(playerScore);
  }

  function increaseOpponentScore() {
    message = "Your opponent won :(";
    opponentScore = increaseByOne(opponentScore);
  }

  //pure functions
  function increaseByOne(score) {
    if (typeof score !== "number") return;
    return score + 1;
  }
})();