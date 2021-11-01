import { pasarTurno } from "../services";

/**
 * Boton para finalizar turno
 * @param {id_partida} props 
 * @returns evento click
 */
export default function PasarTurno(props) {
    return (
        <button
            className="btn btn-dark"
            onClick={(e) => pasarTurno({ id_partida: props.id_partida })}
        >
            Pasar turno
        </button>
    );
}
