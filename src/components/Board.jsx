import styles from "./Board.module.css";

function Board() {
  const filler = ["", "", "", "", "", "", "", "", ""];
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
  function decideBackground(row, column) {
    if (row % 2 == 0 && column % 2 != 0) {
      return styles.light;
    } else if (row % 2 !== 0 && column % 2 == 0) {
      return styles.light;
    } else {
      return styles.dark;
    }
  }

  return (
    <div>
      <h1>Chess</h1>
      {/* create rows */}
      {numbers.reverse().map((number, i) => (
        <div key={i}>
          {/* fill the first element of each row with a number then with empty strings. Fill the last row with letters */}
          {number == 0 ? (
            <div className={styles.flex}>
              {letters.map((letter, j) => (
                <p key={`${letter}-${j}`} className={styles.square}>
                  {letter}
                </p>
              ))}
            </div>
          ) : (
            <div className={styles.flex}>
              {filler.map((empty, j) =>
                j === 0 ? (
                  <div key={`e-${j}`} className={styles.squareDiv}>
                    {number}
                  </div>
                ) : (
                  <p
                    key={`e-${j}`}
                    className={`${styles.square} ${
                      decideBackground(i, j)
                      //   j % 2 == 0 ? styles.dark : styles.light
                    }
                    `}
                  >
                    {board[i][j - 1]}
                  </p>
                )
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Board;
