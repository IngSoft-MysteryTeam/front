import { useState } from "react";
import BotonResponderSospecha from "./BotonResponderSospecha";

/**
 * Renderiza las cartas de una sospecha
 * @param  {object} props Nombre de jugador y cartas de sospecha
 */
export default function MostrarSospecha(props) {
    const [respuesta, setRespuesta] = useState(null);

    return (
        <div className="sospecha">
            <h1>{props.sospecha.nombre} sospechó</h1>
            <div
                style={{
                    display: "flex",
                    columnGap: "15px",
                    marginTop: "10px",
                }}
            >
                {props.sospecha.cartas.map((e, key) => (
                    <img
                        src={`/cartas/${e}.png`}
                        height="200px"
                        key={key}
                        alt={e}
                    />
                ))}
            </div>
            {props.respuestaSospecha ? (
                props.respuestaSospecha.carta === "NINGUNA" ? (
                    <h1>Nadie respondio</h1>
                ) : <>
                    <h1>{props.respuestaSospecha.nombre} responde</h1>
                    <img
                        src={`/cartas/${props.respuestaSospecha.carta}.png`}
                        height="200px"
                        a
                        alt={props.respuestaSospecha.carta}
                    />
            </>

            ) : null}
            {props.respondiendoSospecha ? (
                <>
                    <h1>Elige una carta para responder:</h1>
                    <div
                        style={{
                            display: "flex",
                            columnGap: "15px",
                            marginTop: "10px",
                        }}
                    >
                        {props.respondiendoSospecha.cartas.map((e, key) => (
                            <img
                                src={`/cartas/${e}.png`}
                                height="200px"
                                onClick={() => setRespuesta(e)}
                                style={{
                                    cursor: "pointer",
                                    opacity: e === respuesta ? "100%" : "50%",
                                }}
                                alt={e}
                                key={key}
                            />
                        ))}
                    </div>
                    {respuesta ? (
                        <BotonResponderSospecha
                            id_sospechante={props.sospecha.id_jugador}
                            id_responde={props.respondiendoSospecha.id_responde}
                            carta={respuesta}
                            setRespondiendoSospecha={
                                props.setRespondiendoSospecha
                            }
                        />
                    ) : null}
                </>
            ) : null}
        </div>
    );
}
