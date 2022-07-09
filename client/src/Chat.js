import React, {useEffect, useState} from "react";
import './App.css';

function Chat({socket, username, room }) {
    const [instantMessage, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const messageSend = async () => {
        if (instantMessage !=="") {
            const messageData = {
                room: room,
                publisher: username,
                message: instantMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };
            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setMessage("");
        }
    };
    useEffect(() => {
        socket.on("obtain_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);
    return (
        <div className="chatBox">
            <div className="chatHeader">
                <h1>Chat</h1>
            </div>
            <div className="chatBody">
                {messageList.map((messageText) => {
                    return (
                    <div className="message" id={username === messageText.publisher ? "first" : "second"}>
                        <div>
                            <div className="messageContent">
                                <p>{messageText.message}</p>
                            </div>
                            <div className="messageInformation">
                                <p>{messageText.publisher} {messageText.time}</p>
                            </div>
                        </div>
                    </div>
                );
                })}
            </div>
            <div className="chatFooter">
                <input type="text" value={instantMessage} placeholder="Type your message" onChange={(event) => {setMessage(event.target.value);}} /><br/>
                <button type="button" className="button" onClick={messageSend}>ENTER</button>
            </div>
        </div>
    );
}

export default Chat;
