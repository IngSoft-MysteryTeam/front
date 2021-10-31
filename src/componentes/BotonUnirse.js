import React from "react-router-dom";

export default function BotonUnirse(props) {
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
