import React, {useState} from "react";
import "../App.css";
import io from "socket.io-client";
import Chat from "../Chat";

const socket = io.connect("http://localhost:3001");

function Home() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [chatOn, setChatOn] = useState(false);

  const joinChat = () => {
      if (username !== "" && room !== "") {
          socket.emit("join_chat", /*username,*/ room);
          setChatOn(true);
      }
  };

  return (
    <div className="App">
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
    </div>
  );
}
export default Home;