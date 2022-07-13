import React from "react";
import "../App.css";
import Eevee from "../assets/Eevee.png";

function About() {
    return (
        <div className="about">
            <h1>About:</h1>
            <p>This is a more advanced messaging application that incorporates a Socket.io library. <br />
            The user is first introduced to the "Homepage" of the application, which directs the user to enter in their credentials.<br />
            Once that's completed (granted the user has a "unique" username) the user will be redirected to their chatroom. <br />
            There, communication may take place if two users use the same Room ID.  <br />
            The UI in this application is very simple but everything else should be working properly...hopefully. <br />
            There are quite a few things I would do differently if I had to redo this application but that's its own story. <br />
            Thank you and I hope this will suffice -Violet.
            </p>
            <img src={ Eevee } alt="Cat" className="photo" />
            <p> Oh and my cat who contributed very little to this assignment.</p>
        </div>
    );
}

export default About;