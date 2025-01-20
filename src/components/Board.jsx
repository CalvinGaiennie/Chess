// test move piece
import styles from "./Board.module.css";
import { useState, useEffect, useRef } from "react";

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

function Board() {
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [boardElement, setBoardElement] = useState(buildBoard(board));

  const inputRef = useRef(null);

  useEffect(() => {
    setBoardElement(buildBoard(board));
  }, [selectedSquare]);

  function selectSquare(row, col) {
    if (selectedSquare) {
      const initRow = selectedSquare[0];
      const initCol = selectedSquare[1];
      console.log(
        `initRow ${initRow} initCol ${initCol} row ${row} col ${col}`
      );
      movePiece(initRow, initCol, row, col);
      setSelectedSquare(null);
    } else {
      setSelectedSquare([row, col]);
    }
  }

  function buildBoard(board) {
    return board.map((row, i) => (
      <div key={i} className={styles.flex}>
        {row.map((square, j) => (
          <div
            key={j}
            className={`${styles.square} ${decideBackground(i, j)} ${
              selectedSquare &&
              selectedSquare[0] === i &&
              selectedSquare[1] === j
                ? styles.selected
                : ""
            }`}
            onClick={() => {
              selectSquare(i, j);
            }}
          >
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
    const piece = board[initialRow][initialColumn];
    const pieceColor = piece[0];
    console.log("pieceColor", pieceColor, typeof pieceColor);
    const occupied = checkIfOccupied(finalRow, finalColumn);
    console.log("occupied by ", occupied);
    if (occupied == "W" && pieceColor == "W") {
      return false;
    } else if (occupied == "B" && pieceColor == "B") {
      return false;
    } else {
      switch (piece) {
        case "WP":
          //makes the pawn unable to capture forward
          if (occupied && initialColumn === finalColumn) {
            return false;
          }
          // Allows a pawn to move 1 forward
          if (finalRow === initialRow - 1 && initialColumn === finalColumn) {
            return true;
            //Allows a pawn to move 2 forward on first move
          } else if (
            finalRow === initialRow - 2 &&
            initialRow === 6 &&
            initialColumn === finalColumn
          ) {
            return true;
            //Allows a pawn to capture diagonally and one forward
          } else if (
            occupied &&
            (initialColumn === finalColumn + 1 ||
              initialColumn === finalColumn - 1) &&
            finalRow === initialRow - 1
          ) {
            return true;
          }
          return false;

        case "WR":
          if (
            (initialRow == finalRow || initialColumn == finalColumn) &&
            occupied != "W"
          ) {
            return true;
          }
          return false;
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
          //makes the pawn unable to capture forward
          if (occupied && initialColumn === finalColumn) {
            return false;
          }
          if (finalRow === initialRow + 1 && initialColumn === finalColumn) {
            return true;
          } else if (finalRow === initialRow + 2 && initialRow === 1) {
            return true;
          }
          return false;
        case "BR":
          if (initialRow == finalRow || initialColumn == finalColumn) {
            return true;
          }
          return false;
        case "BB":
          return true;
        case "BKN":
          return true;
        case "BQ":
          return true;
        case "BK":
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
        default:
          return false;
      }
    }
  }
  //Major to do is to figure out how to not let pieces jump over other peices.
  function checkPathDiagonal(initialRow, initialColumn, finalRow, finalColumn) {
    // write a function to calculate diagonals and get a diagonal of the board into an array then map for occupation and return a true false
    //use if statements to figure out if the diagonal is going up the board or down in both directions and use this to decide on which function to use
    //create init array
    // map over
    //return
  }
  function checkPathRow(initialRow, initialColumn, finalRow, finalColumn) {
    // map through the row between the init and final and check each for occupation then return a true false
    // either use different functions depending on the direction of travel or have a variable in the function that switched the direction
  }
  function checkPathColumn(initialRow, initialColumn, finalRow, finalColumn) {
    //make an array to represent the column then map through it between the init and final, check for occupation and return a true false
  }

  function checkIfOccupied(row, col) {
    const piece = board[row][col];
    const color = piece[0];
    if (color == "W") {
      return "W";
    } else if (color == "B") {
      return "B";
    } else {
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
  function movePiece(initialRow, initialCol, finalRow, finalColumn) {
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

  function movePieceFromRef() {
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
    const [initialRow, initialColumn, finalRow, finalColumn] = inputsAsNums;
    console.log(
      "initialRow",
      initialRow,
      "initialC",
      initialColumn,
      "finalRow",
      finalRow,
      "finalCol",
      finalColumn
    );
    movePiece(initialRow, initialColumn, finalRow, finalColumn);
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
        <button onClick={() => movePieceFromRef()}>Move</button>
      </div>
    </div>
  );
}

export default Board;
