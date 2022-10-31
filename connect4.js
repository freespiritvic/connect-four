/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
//  window.alert("Welcome! Player 1 begin.");

const beginGame = setTimeout(alertFunc, 1000);

function alertFunc() {
  window.alert("Welcome! Player 1 starts game. GOODLUCK!");
}

const WIDTH = 7; //indices would be 0-6 = 7spots(x)
const HEIGHT = 6;  //indices would be 1-6 = 6spots(y)

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */


function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for(let y = 0; y < HEIGHT; y++) {  //FOR loop created for the y-axis
    board.push(Array.from({length: WIDTH})); // (board)empty array + (push)adding to board + (Array.from)creates a new array from the target object of length 7
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const board = document.getElementById("board");

  // TODO: add comment for this code
  const topRow = document.createElement("tr");  //Create a variable = to a new element for the table(tr) on the document
  topRow.setAttribute("id", "top-column"); // Create an id called "top-column" for the new(tr) to the new variable called "topRow"
  topRow.addEventListener("click", handleClick); //Add an event called "click" with a value, handclick on your mouse to the new variable "topRow"

  for (let x = 0; x < WIDTH; x++) {  // create a FOR loop for the x-axis
    const topCell = document.createElement("td"); //Create a variable = to a new element for the data cell in the table(td) on the document
    topCell.setAttribute("id", x);  //Create an id for x-axis value for the new(td) to the new variable called "topCell"
    topRow.append(topCell);  //Add the new "topCell" variable to your tr variable "topRow"
  }
  board.append(topRow);   //Add the new tr variable "topRow" to your board

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {  //create a FOR loop for the y-axis
    const row = document.createElement("tr"); //Create a variable = to a new element for the table(tr) on the document

    for (let x = 0; x < WIDTH; x++) { //Within y-axis FOR loop create a FOR loop for x axis 
      const cell = document.createElement("td"); //Create a variable = to a new element for the data cell in the table(td) on the document
      cell.setAttribute("id", `row-${y+1}-col-${x+1}`); //Create an id for y-axis -(minus) x-axis value for the new(td) to the new variable called "cell"
      row.append(cell);  //Add the new "cell" variable to your tr variable "row"
    }
    board.append(row);  //Add the new tr variable "row" to your htmlBoard
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT -1; y >= 0; y--) {
    if(!board[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement("div"); 
  piece.classList.add("piece");
  piece.classList.add(`p${currPlayer}`);

const spot = document.getElementById(`row-${y+1}-col-${x+1}`);
spot.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  setTimeout(()=>{  
    alert(msg) 
    board=[] //no new inputs
    location.reload()// reload the page after game finishes
  },0)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);


  // check for win
  if (checkForWin()) {
    return endGame(`CONGRATULATIONS! Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(row => row.every(cell => cell))) {
    return endGame(`It's a TIE! Try Again.`);
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) { 
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];  //checking up to four in x-axis(horizontal)
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];  //checking up to four in y-axis(vertical)
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; //checking upwards to the right diagnolly 
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];  //checking upwards to the left diagnolly 

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}


makeBoard();
makeHtmlBoard();
