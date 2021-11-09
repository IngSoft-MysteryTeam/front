import React from "react";
import { hacerAcusacion } from "../services";

/**
 * Renderiza el botón que envía la acusacion al back
 * @param {object} props ID jugador y partida, monstruo, recinto y víctima
 * @returns
 */
export default function BotonEnviarAcusacion(props) {
    return (
        <button
            className={"btn btn-dark"}
            onClick={(e) =>
                hacerAcusacion({
                    victima: props.victima,
                    monstruo: props.monstruo,
                    recinto: props.recinto,
                    id_jugador: props.id_jugador,
                    id_partida: props.id_partida,
                })
            }
        >
            Enviar Acusacion
        </button>
    );
}
