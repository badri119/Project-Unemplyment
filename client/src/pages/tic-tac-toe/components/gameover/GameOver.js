import React from "react";
import "./GameOver.css";

const GameOver = ({ winner, restart }) => {
  return (
    <div className="game-over">
      <h2>Game Over!</h2>
      {winner ? <p>{winner} won!</p> : <p>It's a Draw!</p>}
      <p>
        <button onClick={restart}>Restart</button>
      </p>
    </div>
  );
};

export default GameOver;
