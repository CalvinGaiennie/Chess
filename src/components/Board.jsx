import styles from "./Board.module.css";
import { useState, useEffect } from "react";

function Board() {
  const [boardElement, setBoardElement] = useState(null);

  useEffect(() => {
    setBoardElement(buildBoard(board));
  }, []);

  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const letters = ["", "A", "B", "C", "D", "E", "F", "G", "H"];

  const board = [
    ["R", "B", "KN", "Q", "K", "Kn", "B", "R"],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["R", "B", "KN", "Q", "K", "Kn", "B", "R"],
  ];

  function buildBoard(board) {
    return board.map((row, i) => (
      <div key={i} className={styles.flex}>
        {row.map((square, j) => (
          <div key={j} className={`${styles.square} ${decideBackground(i, j)}`}>
            {square}
          </div>
        ))}
      </div>
    ));
  }

  function decideBackground(row, column) {
    if (row % 2 == 0 && column % 2 != 0) {
      return styles.light;
    } else if (row % 2 !== 0 && column % 2 == 0) {
      return styles.light;
    } else {
      return styles.dark;
    }
  }

  function movePiece(initialRow, initialCol, finalRow, finalColumn) {
    // checkMove(initialRow, initialCol, finalRow, finalColumn);
    const newBoard = [...board];
    const peice = board[initialRow][initialCol];
    newBoard[initialRow][initialCol] = "";
    newBoard[finalRow][finalColumn] = peice;
    setBoardElement(buildBoard(newBoard));
  }

  return (
    <div>
      <h1>Chess</h1>
      <div className={styles.flex}>
        <div className="rowLabels">
          {numbers.map((number, i) => (
            <div key={i} className={styles.square}>
              {number}
            </div>
          ))}
        </div>
        <div>{boardElement}</div>
      </div>
      <div className="columnLabels">
        <div className={styles.flex}>
          {letters.map((letter, i) => (
            <div key={i} className={styles.square}>
              {letter}
            </div>
          ))}
        </div>
      </div>
      <div className="moveTest">
        <button onClick={() => movePiece(0, 0, 1, 1)}>Move</button>
      </div>
    </div>
  );
}

export default Board;
