import "./Main.css";
import Player from "./components/player/Player";
import Board from "./components/boards/Board";
import Logs from "./components/Logs";
import GameOver from "./components/gameover/GameOver";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./WinningCombinations";

//helper function:
const activePlayer = (turns) => {
  let currPlayer = "X";
  if (turns.length > 0 && turns[0].player === "X") {
    currPlayer = "O";
  }
  return currPlayer;
};

function Main() {
  const [players, setPlayers] = useState({ X: "Player 1", O: "Player 2" });
  const [turns, setTurns] = useState([]);

  const active = activePlayer(turns);

  const startingBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  let gameBoard = [...startingBoard.map((array) => [...array])]; //initial game board

  //looping through the turns
  for (const turn of turns) {
    //obtained the values via props through setTurns()
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ) {
      winner = players[firstSquare];
    }
  }

  const draw = turns.length === 9 && !winner;

  const handleSelectSquare = (rowIndex, colIndex) => {
    // setActive((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
    setTurns((prevTurns) => {
      const currentPlayer = activePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };

  //Restarting the game
  const restart = () => {
    setTurns([]);
  };

  //name change function
  const handleNameChange = (symbol, newName) => {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  };
  return (
    <div className="App">
      <div className="container">
        <div className="game-container">
          <ol className="players highlight-player">
            <Player
              name="Player 1"
              symbol="X"
              isActive={active === "X"}
              handleNameChange={handleNameChange}
            />
            <Player
              name="Player 2"
              symbol="O"
              isActive={active === "O"}
              handleNameChange={handleNameChange}
            />
          </ol>
          {winner || draw ? (
            <GameOver winner={winner} restart={restart} />
          ) : null}
          <Board handleSelectSquare={handleSelectSquare} board={gameBoard} />
        </div>
        <div className="log-container">
          <p className="text-player">Player Log</p>
          <Logs turns={turns} />
        </div>
      </div>
    </div>
  );
}

export default Main;
