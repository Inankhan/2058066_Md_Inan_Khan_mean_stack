let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

let mongoose = require("mongoose");
let url = "mongodb://localhost:27017/tcsmean";
mongoose.pluralize(null);   
mongoose.connect(url).
then(res=>console.log("connected")).
catch(err=>console.log(err))

let chatSchema = mongoose.Schema({
    name: String,
    msg: String
});

let chatModel = mongoose.model("Chats",chatSchema);

app.get("/",(req,res)=> {
    res.sendFile(__dirname+"/index.html");
})

io.on("connection",(socket)=> {
    socket.on("client",(client)=> {
        console.log(client);
        chatModel.insertMany(client,(err,result)=> {
            if(!err){
                    console.log("Record stored successfully")
            }else {
                    console.log(err);
            }
        })
    })
})
http.listen(9090,()=>console.log("Server running on port number 9090"));