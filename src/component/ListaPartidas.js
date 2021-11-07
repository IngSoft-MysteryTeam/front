import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { unirJugador, traerPartidas, obtNombrejugador } from "../services";
import BotonCrear from "./BotonCrear";
import BotonUnirse from "./BotonUnirse";
import BotonAct from "./BotonAct";

/**
 * Muestra una lista con las partidas aun no iniciadas.
 * @returns Renderizado JSX
 */
export default function ListaPartidas() {
    /**
     * Ayuda a redireccionar al jugador a la partida
     */
    const history = useHistory();
    /**
     * Estado que nos guarda las partidas no iniciadas obtenidas del back
     * @param  {list} [] Lista de partidas obtenidas del back
     */
    const [partidas, setPartidas] = useState([]);

    /**
     * Obtiene las partidas desde el back.
     */
    function obtPartidas() {
        traerPartidas()
            .then((res) => {
                console.log(res);
                setPartidas(res.data);
            })
            .catch((err) => {
                alert("No hay partidas. ¡Crea una nueva!");
                console.log(err);
            });
    }

    /**
     * Redirecciona al jugador a la partida y envia al jugador al back
     * @param {Evento} e
     */
    function Unirsepartida(e) {
        unirJugador({
            id_partida: e.id_partida,
            nombre: obtNombrejugador(),
        })
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    history.push({
                        pathname: `/partidas/${res.data.id_partida}`,
                        state: { ...res.data, nombre: e.nombre },
                    });
                } else if (res.status === 202) {
                    //console.log(res)
                    if (res.data.detail === "La partida ya fue iniciada") {
                        alert("La partida ya fue iniciada");
                        obtPartidas();
                    } else if (res.data.detail === "La partida esta llena") {
                        alert("La partida esta completa");
                        obtPartidas();
                    }
                }
            })
            .catch((err) => {
                alert("Ocurrió un error. Revise la consola.");
                console.error(err);
            });
    }
    /**
     * Renderiza la lista de partidas actualizada
     */
    useEffect(() => {
        obtPartidas();
    }, []);

    return (
        <div style={{ maxWidth: "750px", margin: "auto" }}>
            <h1 style={{ color: "white" }}>Unirse a una partida</h1>
            <table className="tablaPartidas" style={{ marginBottom: "10px" }}>
                <thead>
                    <tr>
                        <th width="50%">Partida</th>
                        <th>Anfitrión</th>
                        <th width="140px">Cant. Jugadores</th>
                    </tr>
                </thead>
                <tbody>
                    {partidas.map((e, key) => (
                        <tr key={key}>
                            <td>{e.nombre}</td>
                            <td>{e.anfitrion}</td>
                            <td>
                                <FontAwesomeIcon icon={faUserFriends} />{" "}
                                {e.cantidad_jugadores}
                                /6
                            </td>
                            <td>
                                <BotonUnirse
                                    partida={e}
                                    unirse={Unirsepartida}
                                />
                            </td>
                        </tr>
                    ))}
                    {partidas.length === 0 ? (
                        <tr style={{ pointerEvents: "none" }}>
                            <td colSpan={3}>
                                <i style={{ color: "gray" }}>No hay partidas</i>
                            </td>
                        </tr>
                    ) : null}
                </tbody>
            </table>
            <BotonAct actpartidas={obtPartidas} />
            <br />
            <BotonCrear />
        </div>
    );
}
