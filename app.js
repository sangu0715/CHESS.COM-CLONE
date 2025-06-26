const express= require('express');
const socket = require('socket.io');
const http = require("http");
const {Chess} = require("chess.js");
const path = require('path');

const app = express();
const server =http.createServer(app);
const io = socket(server);

const chess= new Chess();

let players={};
let currentplayer ="w";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req,res)=>{ 
  res.render("index",{title: "Chess Game"});
});


io.on("connection", function(uniqueSocket){
    console.log("connected");
   
    if (!players.white) {
        players.white = uniqueSocket.id;
        uniqueSocket.emit("PlayerRole", "W");
    } else if (!players.black) {
        players.black = uniqueSocket.id;
        uniqueSocket.emit("PlayerRole", "B");
    } else {
        uniqueSocket.emit("PlayerRole", "Spectator");
    }

     uniqueSocket.on("disconnected", function(){
        if(uniqueSocket.id === players.white){
            delete players.white;
        } else if(uniqueSocket.id === players.black){
            delete players.black;
        }
     })


     uniqueSocket.on("move", (move) => {
        try{
            if(chess.turn() === "w" && uniqueSocket.id === players.white)return;
            if(chess.turn() === "b" && uniqueSocket.id === players.black)return;

            const result = chess.move(move);
            if(result){
                currentplayer = chess.turn();
                io.emit("move",move);
                io.emit("BoardState", chess.fen());
            }
            else{
                console.log("Invalid move attempted by player: ", move);
                uniqueSocket.emit("Invalid Move", move); 
            }
        }
        catch(e){
            console.log("Error processing move: ", e);
            uniqueSocket.emit("Invalid move", move);
            return;
        }
      })
     });

server.listen(3012, function(){
    console.log("listening");
});
