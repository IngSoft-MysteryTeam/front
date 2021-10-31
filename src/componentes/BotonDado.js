import { obtDado } from "../services";

export default function BotonDado(props) {
    return (
        <button className="btn btn-dark" onClick={(e) => obtDado({id_partida : props.id_partida})}>
            Lanzar dado
        </button>
    );
}
