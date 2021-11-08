import React from "react-router-dom";

/**
 * Botón para unirse a una partida no iniciada.
 * @param {partida | unirse} props Botón por partida.
 * @returns evento click
 */
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
