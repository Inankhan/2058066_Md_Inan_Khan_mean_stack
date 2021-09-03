let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let questions = ['How are you?', 'How was your day today?', 'Where do you live?', 'Do you like CS?', 'What brings you here?']

app.get("/",(req,res)=> {
    res.sendFile(__dirname+"/index.html");
})

io.on("connection",(socket)=> {
    socket.on("client",(msg)=> {
        console.log(msg);
        
    })
    let randNum = Math.floor(Math.random() * 5)
        let server = `Server says: ${questions[randNum]}`
        socket.emit("server",server);
})

http.listen(9090,()=>console.log("Server running on port number 9090"));