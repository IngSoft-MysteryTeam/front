import { hacerSospecha } from "../services";
/**
 * Renderiza el boton que envia la sospecha al back
 * @param  {object} props ID jugador y partida, monstruo y victima
 */
export default function BotonEnviarsospecha(props) {
    return (
        <button
            className={"btn btn-dark"}
            onClick={(e) => {
                hacerSospecha({
                    victima: props.data.victima,
                    monstruo: props.data.monstruo,
                    id_jugador: props.data.id_jugador,
                    id_partida: props.data.id_partida,
                });
                props.sospechando(false);
            }}
        >
            Enviar Sospecha
        </button>
    );
}
