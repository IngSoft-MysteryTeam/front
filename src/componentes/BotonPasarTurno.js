import { pasarTurno } from "../services";

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
