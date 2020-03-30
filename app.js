//Game rules
//player must guess a number between min and max
//player gets a certain amount of guess
//notify player of number of guesses remaining
//notify player of correct answer if they lose
//let player choose whether to play again

//game values
let min = 1,
  max = getRandomInt(100),
  winningNum = getRandomInt(max);
guessesLeft = 3;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//UI elements
const game = document.querySelector("#game"),
  minNumSpan = document.querySelector(".min-num"),
  maxNumSpan = document.querySelector(".max-num"),
  guessInput = document.querySelector("#guess-input"),
  guessSubmitBtn = document.querySelector("#guess-btn"),
  pMessage = document.querySelector(".message"),
  playAgainBtn = document.querySelector("#play-again");

//assign starting UI values
minNumSpan.textContent = min;
maxNumSpan.textContent = max;

//listen for guess btn click
guessSubmitBtn.addEventListener("click", submitGuess);

function submitGuess(e) {
  let guess = parseInt(guessInput.value);
  if (guessesLeft > 1) {
    //validate guess input
    if (isNaN(guess) || guess < min || guess > max) {
      guessesLeft -= 1;
      setMessage(`Please enter a number between ${min} and ${max}.`, "red");
      guessInput.value = "";
      guessInput.style.borderColor = "red";
    } else if (guess === winningNum) {
      guessesLeft = 0;
      setMessage(`Correct, ${guess} is the right number.`, "green");
      guessInput.value = "";
      playAgainBtn.style.display = "block";
      guessInput.disabled = true;

      guessInput.style.borderColor = "green";
    } else {
      guessesLeft -= 1;
      setMessage(
        `Sorry, ${guess} is not the right answer. You have ${guessesLeft} guesses left.`,
        "orange"
      );
      guessInput.style.borderColor = "orange";
      guessInput.value = "";
    }
  } else {
    setMessage(`Sorry, you are out of guesses.`);
    playAgainBtn.style.display = "block";
    guessInput.disabled = true;
    guessInput.value = "";
  }
}
playAgainBtn.addEventListener("click", playAgain);
function playAgain(e) {
  window.location.reload("false");
}

function setMessage(msg, color) {
  pMessage.style.color = color;
  pMessage.textContent = msg;
}
