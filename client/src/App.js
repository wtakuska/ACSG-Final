import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/about" element={<About/>} /> 
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

/*import React, {useState} from "react";
import "./App.css";
import io from "socket.io-client";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [chatOn, setChatOn] = useState(false);

  const joinChat = () => {
      if (username !== "" && room !== "") {
          socket.emit("join_chat", room);
          setChatOn(true);
      }
  };

  return (
    <div className="App">
      <Router>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/about" element={<About/>} /> 
            </Routes>
      {!chatOn ? (
        <div className="chatContainer">
            <h1>Join Chatroom</h1>
            <input type="text" placeholder="NAME" onChange={(event) => {setUsername(event.target.value);}} />
            <input type="text" placeholder="ROOM ID" onChange={(event) => {setRoom(event.target.value);}} /><br/>
            <button onClick={joinChat}>JOIN CHAT</button>
        </div>
      ) : (     
        <Chat socket={socket} username={username} room={room} />
      )}
      <Footer />
    </Router>  
    </div>
  );
}

export default App;*/
