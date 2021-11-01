import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { unirJugador, traerPartidas, obtNombrejugador } from "../services";
import BotonCrear from "./BotonCrear";
import BotonUnirse from "./BotonUnirse";
import BotonAct from "./BotonAct";

export default function ListaPartidas() {
    const history = useHistory();
    const [partidas, setPartidas] = useState([]);

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

    function Unirsepartida(e) {
        unirJugador({
            id_partida: e.id_partida,
            nombre: obtNombrejugador(),
        })
            .then((res) => {
                if (res.status === 200) {
                    history.push({
                        pathname: `/partidas/${res.data.id_partida}`,
                        state: { ...res.data, nombre: e.nombre },
                    });
                }
                if (res.status === 202) {
                    alert("La partida esta completa");
                    obtPartidas();
                }
            })
            .catch((err) => {
                alert("Ocurrió un error. Revise la consola.");
                console.error(err);
            });
    }

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
                                {e.cantidad_jugadores}/6
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
