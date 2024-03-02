import express, { json } from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import cors from "cors";

const app = express();
app.use(cors({
    origin: "http://127.0.0.1:5500"
}));

const server = createServer(app); 
const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

io.on("connection", (socket) => {
    // ...
    console.log("user joined...")
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
      //well by this we have the access of dat that a client send to th emit chat message 
      //but we want it to send to other users l
      //mainly we want to brodcast this 
      io.emit("chat message", msg)
      //for brodcasting we will user io.emit(as we emited the message from the client side )
    });
    socket.on
    
});

io.on('public', (msg) => {
    console.log("user is in public chanel...")
    socket.emit("publicData ", "this is the public data send from the server...")
    //well by this we have the access of dat that a client send to th emit chat message 
    //but we want it to send to other users l
    //mainly we want to brodcast this 

    //for brodcasting we will user io.emit(as we emited the message from the client side )
  });

//as for server on means the it is listning the sockets 
//and it will recive 

//for sending the data we use emit and the channel name and the message 





//port
const PORT_NO = 8080;


server.listen(PORT_NO, ()=>{
    console.log("Server started at port :", PORT_NO)
})

