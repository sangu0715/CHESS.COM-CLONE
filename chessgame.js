const socket = io();

const chess = new Chess();

const boardElement = document.querySelector(".chessboard");


let draggedPiece= null;
let sourceSquare=null;
let playerRole= null;


const renderBoard = () => {
    const board= chess.board();
    boardElement.innerHTML = "";
    board.forEach( (row, rowIndex) => {
        row.forEach((square, squareIndex) => {
            const squareElement = document.createElement("div");
            
            squareElement.classList.add("square", (rowIndex + squareIndex) % 2 === 0 ? "light" : "dark");

            squareElement.dataset.row = rowIndex;
            squareElement.dataset.col = squareIndex;


            if (square) {
                const pieceElement = document.createElement("div");
                pieceElement.classList.add("piece");
                pieceElement.style.color = square.color === "w" ? "#ffffff" : "#000000";

                pieceElement.innerText = getPieceUnicode(square);
                pieceElement.draggable = playerRole === square.color;

                pieceElement.addEventListener("dragstart", (e) => {
                    if (pieceElement.draggable) {
                        draggedPiece = pieceElement;
                        sourceSquare = { row: rowIndex, col: squareIndex };
                        e.dataTransfer.setData("text/plain", "");
                    }
                });

                pieceElement.addEventListener("dragend", () => {
                    draggedPiece = null;
                    sourceSquare = null;
                });


                squareElement.appendChild(pieceElement);
            }

            squareElement.addEventListener("dragover", (e) => {
                e.preventDefault();
            });
            squareElement.addEventListener("drop", (e) => {
                e.preventDefault();
                if (draggedPiece) {
                    const targetSource = {
                        row: parseInt(squareElement.dataset.row),
                        col: parseInt(squareElement.dataset.col),
                    };
                    handleMove(sourceSquare, targetSource);
                }
            });

            boardElement.appendChild(squareElement);

        });
    });  

    if(playerRole === "b"){
        boardElement.classList.add("flipped");
    }
    else{
        boardElement.classList.remove("flipped");
    }
};
const handleMove=(source, target) =>{
    const move = {
        from: `${ string.fromCharCode(97 + source.col) }${ 8 - source.row }`,
        to: `${ string.fromCharCode(97 + target.col) }${ 8 - target.row }`,
        promotion : "q" // Always promote to queen for simplicity
    };

    socket.emit("move", move);
};

const getPieceUnicode = (piece) =>{
    const unicodePieces = {
        p: "♟", // Pawn
        r: "♜", // Rook
        n: "♞", // Knight
        b: "♝", // Bishop
        q: "♛", // Queen
        k: "♚", // King
        P: "♙", // Pawn
        R: "♜", // Rook
        N: "♞", // Knight
        B: "♝", // Bishop
        Q: "♛", // Queen
        K: "♚", // King

    };
    return unicodePieces[piece.type] || "";
};

socket.on("PlayerRole", function(role)  {
      playerRole = role;
      renderBoard();
});

socket.on("spectatorRole", function() {
      playerRole = null;
      renderBoard();
});

socket.on("boardState", function(fen)  {
      chess.load(fen);
      renderBoard();
});

socket.on("move",function (move) {
      chess.move(move);
      renderBoard();
});
renderBoard();