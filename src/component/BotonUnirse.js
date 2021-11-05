import React from "react-router-dom";

/**
 * Boton para unirse a una partida no iniciada. Llamada en ListaPartidas.
 * @param {partida | unirse} props Boton por partida.
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
