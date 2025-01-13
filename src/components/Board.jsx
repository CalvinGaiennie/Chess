import styles from "./Board.module.css";
import { useState, useEffect, useRef } from "react";

function Board() {
  const [boardElement, setBoardElement] = useState(null);
  const inputRef = useRef(null);
  useEffect(() => {
    setBoardElement(buildBoard(board));
  }, []);

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
  const letters = ["", "A", "B", "C", "D", "E", "F", "G", "H"];
  const lettersLC = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const lettersCAPS = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const board = [
    ["BR", "BB", "BKN", "BQ", "BK", "BKN", "BB", "BR"],
    ["BP", "BP", "BP", "BP", "BP", "BP", "BP", "BP"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["WP", "WP", "WP", "WP", "WP", "WP", "WP", "WP"],
    ["WR", "WB", "WKN", "WQ", "WK", "WKN", "WB", "WR"],
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

  function checkMove(initialRow, initialColumn, finalRow, finalColumn) {
    const peice = board[initialRow][initialColumn];
    switch (peice) {
      case "WP":
        if (finalRow === initialRow - 1) {
          return true;
        } else if (finalRow === initialRow - 2 && initialRow === 6) {
          return true;
        }
        return false;
      case "WR":
        return true;
      case "WB":
        return true;
      case "WKN":
        return true;
      case "WQ":
        return true;
      case "WK":
        if (
          (initialRow == finalRow - 1 ||
            initialRow == finalRow + 1 ||
            initialRow == finalRow) &&
          (initialColumn == finalColumn - 1 ||
            initialColumn == finalColumn + 1 ||
            initialColumn == finalColumn)
        ) {
          return true;
        }
        return false;
      case "BP":
        if (finalRow === initialRow + 1) {
          return true;
        } else if (finalRow === initialRow + 2 && initialRow === 1) {
          return true;
        }
        return false;
      case "BR":
        return true;
      case "BB":
        return true;
      case "BKN":
        return true;
      case "BQ":
        return true;
      case "BK":
        return true;
      default:
        return false;
    }
  }

  function changeInputFromLetterToNumber(inputsArray) {
    if (lettersLC.includes(inputsArray[1])) {
      const inputLetter = inputsArray[1];
      inputsArray[1] = lettersLC.indexOf(inputLetter);
    } else if (lettersCAPS.includes(inputsArray[1])) {
      const inputLetter = inputsArray[1];
      inputsArray[1] = lettersCAPS.indexOf(inputLetter);
    }
    if (lettersLC.includes(inputsArray[3])) {
      const inputLetter = inputsArray[3];
      inputsArray[3] = lettersLC.indexOf(inputLetter);
      console.log("new final col", lettersLC.indexOf(inputLetter));
    } else if (lettersCAPS.includes(inputsArray[3])) {
      const inputLetter = inputsArray[3];
      inputsArray[3] = lettersCAPS.indexOf(inputLetter);
      console.log("new final col", lettersCAPS.indexOf(inputLetter));
    }
  }

  // initialRow, initialCol, finalRow, finalColumn
  function movePiece() {
    const inputs = inputRef.current.value;
    const inputsArray = inputs.split(",");
    const currIR = inputsArray[0];
    inputsArray[0] = currIR - 1;
    const currFR = inputsArray[2];
    inputsArray[2] = currFR - 1;
    console.log("irr", inputsArray[2]);
    if (
      lettersLC.includes(inputsArray[1]) ||
      lettersLC.includes(inputsArray[3]) ||
      lettersCAPS.includes(inputsArray[1]) ||
      lettersCAPS.includes(inputsArray[1])
    ) {
      changeInputFromLetterToNumber(inputsArray);
    }

    const inputsAsNums = inputsArray.map((input) => Number(input));
    const [initialRow, initialCol, finalRow, finalColumn] = inputsAsNums;
    console.log(
      "initialRow",
      initialRow,
      "initialC",
      initialCol,
      "finalRow",
      finalRow,
      "finalCol",
      finalColumn
    );
    if (checkMove(initialRow, initialCol, finalRow, finalColumn)) {
      const newBoard = [...board];
      const peice = board[initialRow][initialCol];
      newBoard[initialRow][initialCol] = "";
      newBoard[finalRow][finalColumn] = peice;
      setBoardElement(buildBoard(newBoard));
    } else {
      alert("Invalid move");
    }
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
        <input type="text" placeholder="IR, IC, FR, FC" ref={inputRef} />
        <button onClick={() => movePiece()}>Move</button>
      </div>
    </div>
  );
}

export default Board;
