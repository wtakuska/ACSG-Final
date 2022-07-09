const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');
//var async = require('async')

dotenv.config()

mongoose.connect(process.env.DB_ACCESS, () => console.log("Database connected")).catch(() => console.log("Database connection error"));
// const connectDB = mongoose.connect("mongodb+srv://<username>:<password>@cluster0.3kcz7.mongodb.net/?retryWrites=true&w=majority"
// ).then(() => console.log("Database connection successful")).catch(() => console.log("Database connection error"));

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true 
    }
});

const User = mongoose.model(
    "User",
    userSchema,
    "usernames"
);


User.findOne({username: "Violet"}, (err, foundItem) => {
    if (err){
        console.log(err);    
    }else {
        console.log(foundItem);
    }
})

app.listen(5005, function (){
    console.log("server listening on port 5005");
})

//const mongoURI = "mongodb+srv://<username>:<password>@cluster0.3kcz7.mongodb.net/?retryWrites=true&w=majority"
// notice the mongoose.createConnection instead of mongoose.connect
// const conn = mongoose.createConnection(mongoURI);

/*mongoose.connect(mongoURI, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));*/


function create(chatUserName) {
    User.create([
        { username: chatUserName}
    ]);

    // var awesome_instance = new User({username: 'Violet', roomID: 'general'})

    // awesome_instance.save(function (err) {
    //     if (err){
    //         console.log(err); 
    //     }
    //     console.log('New Author: ' + awesome_instance);
    //   } );
}

function getAll() {
    const filter = {username: 'Violet'};
    const all = User.findOne(filter);
    console.log(all);
    return all;
}

// create('Violet');
getAll();
// db.close();
