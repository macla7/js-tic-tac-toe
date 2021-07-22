const view = (() => {
  const formContainer = document.getElementById('form-container');

  const bringUpForm = () => {
    formContainer.classList.toggle('show-form')
  }

  const radioSelect = () => {
    var radios = document.getElementsByName('symbol');
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        read = radios[i].value == 'x' ? 'x' : 'o'
        return read
      }
    }
  }

  return {bringUpForm, radioSelect}
})();

const game = (() => {
  let gameBoard = ['','','','','','','','',''];
  let human = 'x';

  /*
  Turn starts
  Annouces who's turn it is.
  Player Picks move
  checkWin --> winTask
  End Turn
  */

  const initGame = (username, symbol) => {
    console.log(`Welcome to the game ${username}, your symbol is ${symbol}`)
  };

  const annouceTurn = () => {

  };

  const playerMoves = () => {

  };

  const checkWin = () => {

  };

  const winTask = () => {

  };

  const turn = () => {

  };

  return {initGame, turn}
})();



const PlayerFactory = (name, symbol) => {

  const pickTile = () => {

  }
}


// Event Listener
const newGameBtn = document.getElementById('new-game-btn')
const formContainer = document.getElementById('form-container');
const formClose = document.getElementById('close');

newGameBtn.addEventListener('click', (e) => {
  view.bringUpForm()
});

formClose.addEventListener('click', (e)=> {
  view.bringUpForm();
});

formContainer.addEventListener('click', (e)=> {
  if (!document.getElementById('form').contains(e.target)) {
    view.bringUpForm();
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value
  let symbol = view.radioSelect()
  console.log(username)
  console.log(symbol)

  game.initGame(username, symbol);
  form.reset();
});




// The code to run game

