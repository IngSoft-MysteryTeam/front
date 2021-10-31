import { iniciarPartida } from "../services";

export default function Iniciar(props) {
    return (
        <button
            className="btn btn-dark"
            disabled={props.cantjugadores < 2}
            onClick={(e) => iniciarPartida({ id_partida: props.id_partida })}
        >
            Iniciar
        </button>
    );
}
