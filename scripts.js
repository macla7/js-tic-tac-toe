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

  const clearBoard = () => {
    tiles.forEach((tile) => {
      tile.textContent = ''
      tile.classList.remove('winner')
      tile.classList.remove('taken')
    })
  }

  const taken = (tileNum, tile) => {
    return tile.classList[2] == 'taken' ? true : false
  }

  return {bringUpForm, radioSelect, taken, clearBoard}
})();

const game = (() => {
  let gameBoard;
  let player1;
  let player2;
  let whosGo;
  let gameOver;
  let winningTiles;

  /*
  Turn starts
  Annouces who's turn it is.
  Player Picks move
  checkWin --> winTask
  End Turn
  */

  const initGame = (playerOne, playerTwo) => {
    view.clearBoard()
    gameBoard = ['1','2','3','4','5','6','7','8','9'];
    gameOver = false;
    view.bringUpForm()
    //alert(`Welcome to the game ${playerOne.username}, your symbol is ${playerOne.symbol}`);

    player1 = playerOne
    player2 = playerTwo

    turn(player1);
  };

  const _annouceTurn = (player) => {
    turnTeller.textContent = `${player.username}'s turn`;
  };

  const playerMoves = (tileNum, tile) => {
    tile.textContent = whosGo.symbol
    gameBoard[tileNum-1] = whosGo.symbol
    tile.classList.add('taken');
    _checkWin();
  };

  const _checkWin = () => {
    console.log(gameBoard)
    if (gameBoard[0] == gameBoard[1] && gameBoard[1] == gameBoard[2]) { _winTiles([0, 1, 2])}
    if (gameBoard[3] == gameBoard[4] && gameBoard[4] == gameBoard[5]) { _winTiles([3, 4, 5])}
    if (gameBoard[6] == gameBoard[7] && gameBoard[7] == gameBoard[8]) { _winTiles([6, 7, 8])}
    if (gameBoard[0] == gameBoard[3] && gameBoard[3] == gameBoard[6]) { _winTiles([0, 3, 6])}
    if (gameBoard[1] == gameBoard[4] && gameBoard[4] == gameBoard[7]) { _winTiles([1, 4, 7])}
    if (gameBoard[2] == gameBoard[5] && gameBoard[5] == gameBoard[8]) { _winTiles([2, 5, 8])}
    if (gameBoard[0] == gameBoard[4] && gameBoard[4] == gameBoard[8]) { _winTiles([0, 4, 8])}
    if (gameBoard[2] == gameBoard[4] && gameBoard[4] == gameBoard[6]) { _winTiles([2, 4, 6])}
    gameOver ? _winTask() : whosGo == player1 ? turn(player2) : turn(player1);
  };

  const _winTiles = (arr) => {
    gameOver = true
    let winner;
    arr.forEach((i) => {
      console.log(`tile-${ i + 1 }`)
      winner = document.getElementsByClassName(`tile-${ i + 1 }`)
      winner[0].classList.add('winner')
    })
  }

  const _winTask = () => {
    console.log('game over!')
  };

  const turn = (player) => {
    whosGo = player
    console.log(`it is your turn ${player.username}`)
    _annouceTurn(player)
  };

  return {initGame, turn, playerMoves}
})();



const PlayerFactory = (username, symbol) => {
  return {username, symbol}
}

const ComputerFactory = (humanSymbol) => {
  const username = 'skynet';
  const symbol = humanSymbol == 'x' ? 'o' : 'x';
  return {username, symbol}
}




// Event Listener

const newGameBtn = document.getElementById('new-game-btn')
const formContainer = document.getElementById('form-container');
const formClose = document.getElementById('close');
const tiles = document.querySelectorAll('.tile')
const turnTeller = document.getElementById('turn-teller')

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

  let player = PlayerFactory(username, symbol);
  let comp = ComputerFactory(player.symbol);

  game.initGame(player, comp);
  form.reset();
});

tiles.forEach((tile) => {
  let tileNum = parseInt(tile.classList[1].match(/\d/))
  tile.addEventListener('click', (e) => {
    console.log(tileNum)
    if (!view.taken(tileNum, tile)) {
    console.log('hey')
    game.playerMoves(tileNum, tile)
    }
  })
})




// The code to run game

