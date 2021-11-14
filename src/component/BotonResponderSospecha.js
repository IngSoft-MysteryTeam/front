import { responderSospecha } from "../services";
/**
 * Renderiza el boton para enviar la carta seleccionada para responder la sospecha.
 * @param  {props} props
 */
export default function BotonResponderSospecha(props) {
    return (
        <button
            className="btn btn-dark"
            style={{ marginTop: "15px" }}
            onClick={(e) => {
                props.setRespondiendoSospecha(null);
                responderSospecha({
                    id_jugador: props.id_sospechante,
                    id_responde: props.id_responde,
                    carta: props.carta,
                });
            }}
        >
            Responder sospecha
        </button>
    );
}
