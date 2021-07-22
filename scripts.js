const view = (() => {
  const formContainer = document.getElementById('form-container');

  const bringUpForm = () => {
    formContainer.classList.toggle('show-form')
  }

  const radioSelect = (group, choice1, choice2) => {
    var radios = document.getElementsByName(group);
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        read = radios[i].value == choice1 ? choice1 : choice2
        return read
      }
    }
  }

  const clearBoard = () => {
    tiles.forEach((tile) => {
      tile.textContent = ''
      tile.classList.remove('winner')
      tile.classList.remove('taken')
      secondHuman[0].classList.remove('show-input');
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
  let compMove;
  let compTile;

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
    if (player.brain == 'ai') {
      let compTileTaken = false
      while(!compTileTaken) {
        compMove = player.move()
        compTile = document.getElementsByClassName(`tile-${ compMove + 1 }`)
        console.log(compTile)
        compTileTaken = compTile[0].classList[2] == 'taken' ? false : true
      }
      playerMoves(compMove, compTile[0])
    }
  };

  return {initGame, turn, playerMoves}
})();



const PlayerFactory = (username, symbol) => {
  return {username, symbol}
}

const ComputerFactory = (symbol) => {
  const username = 'skynet';
  const brain = 'ai';

  const move = () => {
    return Math.floor(Math.random() * 9);
  }
  return {username, symbol, brain, move}
}




// Event Listener

const newGameBtn = document.getElementById('new-game-btn')
const formContainer = document.getElementById('form-container');
const formClose = document.getElementById('close');
const tiles = document.querySelectorAll('.tile');
const turnTeller = document.getElementById('turn-teller');
const player2Choice = document.querySelectorAll('.player-2-choice');
const secondHuman = document.getElementsByClassName('second-human');

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

player2Choice.forEach((btn) => {
  btn.addEventListener('click', (e) => {
  let isHuman = view.radioSelect('opponent', 'human', 'computer');
  if (isHuman=='human') {
    secondHuman[0].classList.add('show-input')
  } else {
    secondHuman[0].classList.remove('show-input')
  }
  })
})

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value
  let symbol = view.radioSelect('symbol', 'x', 'o');
  let opponent = view.radioSelect('opponent', 'human', 'computer');
  let human2Username = document.getElementById('human-2-username').value
  let symbol2 = symbol == 'x' ? 'o' : 'x';
  let player2;

  console.log(username)
  console.log(symbol)
  console.log(opponent)

  let player = PlayerFactory(username, symbol)
  if (opponent == 'computer') {
    player2 = ComputerFactory(symbol2);
  } else if (opponent = 'human') {
    player2 = PlayerFactory(human2Username, symbol2);
  } else {
    console.log('error')
  }

  game.initGame(player, player2);
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

