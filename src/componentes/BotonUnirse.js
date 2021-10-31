import React from "react-router-dom";

export default function BotonUnirse(props) {
    /* var exampleSocket = new WebSocket("ws://www.example.com/socketserver");
    exampleSocket.send("Here's some text that the server is urgently awaiting!"); */

    return (
        <div>
            <button
                className="btn btn-dark"
                onClick={(e) => props.unirse(props.partida)}
            >
                Unirse
            </button>
        </div>
    );
}
