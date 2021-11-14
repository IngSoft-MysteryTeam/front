import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { enviarMensaje, obtNombrejugador } from "../services";
import Mensaje from "./Mensaje";

/**
 * Cuadro donde se podrán visualizar mensajes en el looby.
 * Lógica no implementada.
 */
export default function Chat(props) {
    function mandarMensaje(mensaje) {
        setMensaje("");
        enviarMensaje({
            id_partida: props.id_partida,
            nombre: obtNombrejugador(),
            texto: mensaje,
        });
    }

    useEffect(() => {
        let element = document.getElementById("chat");
        element.scrollTop = element.scrollHeight;
    }, [props.mensajesChat]);

    const [mensaje, setMensaje] = useState("");

    return (
        <div
            style={{ display: "flex", flexDirection: "column", rowGap: "10px" }}
        >
            <div id="chat" className="divChat">
                {props.mensajesChat.map((e, i) => (
                    <Mensaje
                        nombre={e.nombre}
                        texto={e.texto}
                        color={e.color}
                        key={i}
                    />
                ))}
            </div>
            <div style={{ display: "flex", columnGap: "10px" }}>
                <input
                    style={{ flexGrow: 1 }}
                    placeholder="Escribe un mensaje..."
                    onKeyUp={(e) =>
                        e.key === "Enter" && mensaje ? mandarMensaje(mensaje) : null
                    }
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    disabled={props.disabled}
                />
                <button
                    className="btn btn-dark"
                    onClick={(e) => mandarMensaje(mensaje)}
                    disabled={!mensaje || props.disabled}
                >
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </div>
        </div>
    );
}
