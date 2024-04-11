import "./Board.css";

const Board = ({ handleSelectSquare, board }) => {
  //   const [gameBoard, setGameBoard] = useState(startingBoard);

  //   const handleSelect = (rowIndex, colIndex) => {
  //     setGameBoard((prevBoard) => {
  //       const updatedBoard = [...prevBoard.map((innerArray) => [...innerArray])];

  //       updatedBoard[rowIndex][colIndex] = active;
  //       return updatedBoard;
  //     });
  //     handleSelectSquare();
  //   };

  return (
    <div>
      <ol className="game-board">
        {board.map((row, rowIndex) => (
          <li key={rowIndex}>
            <ol>
              {row.map((col, colIndex) => (
                <li key={colIndex}>
                  <button
                    onClick={() => handleSelectSquare(rowIndex, colIndex)}
                    disabled={col !== null} //Making sure the button is clicked only once, it disables only if a button has either X or O
                  >
                    {col}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Board;
