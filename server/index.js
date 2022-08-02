const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const dotenv = require('dotenv');
const { Server } = require("socket.io");
const { default: mongoose } = require("mongoose");

dotenv.config();

app.use(express.json());
//app.use(express.urlencoded()); 

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

mongoose.connect(process.env.DB_ACCESS, () => console.log("Database connected")).catch(() => console.log("Database connection error"));

var schema = require('./schema_file').userSchema;

const User = mongoose.model(
    "User",
    schema,
    "usernames"
);

mongoose.connection.once('open', function(){ 
    console.log('Connected to database!')
    app.use('/', express.query());

    app.get('/Users', function(request, response){  
        var query = User.find(request.query.uniqueName);
        query.exec(function (err, docs){
            if(err) {
                console.error('There was an uncaught error', err);
            } else {
                console.log(docs);
                response.status(200);
                response.send(JSON.stringify({docs}));
            }
        });
    })

    app.post('/Users', function(request, response){
        var newUser = new User({
            uniqueName: request.body.uniqueName
        });
        newUser.save(function (err, doc) {
            if(err) {
                console.error('There was an uncaught error', err);
            } else {
                console.log(doc);
                response.status(200);
            }
        });
    })

    app.listen(5005, function (){
        console.log("server listening on port 5005");
    })

});

function getAll() {
    mongoose.connect(process.env.DB_ACCESS, function (err, db) {
        if (err) throw err;
        var coll = db.collection('usernames');
        coll.find({}, {projection: {
            _id: false,
            username: true
        }}).toArray(function(err, results) {
            console.dir(results);
            return results;
        });
    });
}

//listening for events within socket.io server
io.on("connection", (socket) => {
    console.log(`Connected: ${socket.id}`);

//getAll() not working properly, crashing app when activated
    socket.on("join_chat", (username, room) => {
        userNames = getAll();
        if(userNames[username]) {
            console.log(`User: ${username} exists in DB!`);
        } else {
            userNames[username] = username;
            socket.username = username;
            io.sockets.emit('usernames', userNames)
        }
        socket.join(username);
        console.log(`User ID: ${username} joined chat: ${room}`);
    });

    socket.on("join_chat", (data) => {
        socket.join(data);
        console.log(`User ID: ${socket.id} joined chat: ${data}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("obtain_message", data);
    });

    socket.on("disconnect", () => {
        console.log("Disconnected", socket.id);
    });
});

server.listen(3001, () => {
    console.log("SERVER RUNNING");
});
