import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import Iniciar from "./BotonIniciar";
import PasarTurno from "./BotonPasarTurno";
import Dado from "./Dado";
import BotonDado from "./BotonDado";
import ListaJugadores from "./ListaJugadores";
import DistribuirCartas from "./DistribuirCartas";
import { obtNombrejugador } from "../services";
import ListadeCartas from "./ListadeCartas";
import Tablero from "./Tablero";

/**
 * Esta funcion visualiza la partida a los jugadores que se han unido.
 * @returns Renderizado de una partida particular del juego.
 */
export default function Lobby() {
    /**
     * Nos indica los parametros para armar la url de la partida.
     */
    const params = useParams();
    /**
     * Nos indica el id del jugador para armar la url de la partida
     */
    const location = useLocation();
    /**
     * Estado que guarda el nombre de los jugadores de la partida
     * @param  {List} location.state.jugadores Jugadores en la partida
     */
    const [jugadores, setJugadores] = useState(location.state.jugadores);
    /**
     * Estado que nos indica el turno del jugador
     * @param  {int} null Numero que indica el orden del jugador
     */
    const [turno, setTurno] = useState(null);
    /**
     * Estado que indica si lanzo el dado y guarda el valor obtenido.
     * @param  {int} -1 Numero del dado
     */
    const [dado, setDado] = useState(-1);
    /**
     * Estado que nos indica las cartas que le tocaron al jugador
     * @param  {List} [] Lista de cartas
     */
    const [cartas, setCartas] = useState([]);
    /**
     * Estado que indica si el jugador esta sospechando.
     * @param  {bool} false
     */
    const [sospechar, setSospechar] = useState(false);
    /* params.id viene de la url de donde estas parado */

    /**
     * Estado que indica las posiciones a las que se puede mover
     * el jugador que tiró el dado.
     * @param  {bool} false
     */
    const [posDisponibles, setPosDisponibles] = useState([])

    useEffect(() => {
        const socket = new WebSocket(
            `ws://localhost:8000/partida/${params.id}/${location.state.id_jugador}`
        );
        socket.addEventListener("open", (e) =>
            console.log("Conexion establecida")
        );
        socket.addEventListener("message", (msg) => {
            let json = JSON.parse(msg.data);
            console.log(msg.data);
            if (json.evento === "Nuevo Jugador") {
                setJugadores((oldJugadores) => {
                    if (
                        oldJugadores.find(
                            (e) => e.nombre === json.jugador.nombre
                        ) === undefined
                    ) {
                        return [...oldJugadores, json.jugador];
                    } else {
                        return oldJugadores;
                    }
                });
            } else if (json.evento === "Jugador desconectado") {
                setJugadores((oldJugadores) =>
                    oldJugadores.filter((e) => e.nombre !== json.jugador.nombre)
                );
            } else if (json.evento === "Nuevo turno") {
                setTurno(json.turno);
                setDado(-1);
            } else if (json.evento === "Tiraron el dado") {
                setDado(json.valor);
            } else if (json.evento === "Reparto de cartas") {
                console.log(json.cartas);
                setCartas(json.cartas);
            } else if (json.evento === "Nueva posicion") {
                setJugadores(oldJugadores => {
                    let jugador = oldJugadores.find(e => e.nombre === json.nombre);
                    jugador.posX = json.x;
                    jugador.posY = json.y;
                    return oldJugadores
                })
            }
        });
        socket.addEventListener("close", (e) =>
            console.log("Se cayo la conexion")
        );
    }, [location.state.id_jugador, params.id]);

    return (
        <div style={{ maxWidth: "1100px", margin: "auto" }}>
            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap-reverse",
                    alignItems: "flex-end",
                }}
            >
                <div style={{ flexGrow: 1, flexBasis: "100px" }}>
                    <h1>{location.state.nombre}</h1>
                    <ListaJugadores jugadores={jugadores} turno={turno} />
                    <div
                        style={{
                            display: "flex",
                            marginTop: "10px",
                            columnGap: "10px",
                            rowGap: "10px",
                            flexWrap: "wrap",
                        }}
                    >
                        {jugadores[0].nombre === obtNombrejugador() &&
                        turno === null ? (
                            <Iniciar
                                id_partida={params.id}
                                cantjugadores={jugadores.length}
                            />
                        ) : null}
                        <button className="btn btn-dark">
                            Abandonar partida
                        </button>
                        {turno != null &&
                        jugadores.find((e) => e.orden === turno).nombre ===
                            obtNombrejugador() ? (
                            dado === -1 ? (
                                <BotonDado id_partida={params.id} id_jugador={location.state.id_jugador} setPosDisponibles={setPosDisponibles} />
                            ) : (
                                <>
                                    <PasarTurno
                                        id_partida={params.id}
                                        sospechar={setSospechar}
                                        setPosDisponibles={setPosDisponibles}
                                    />
                                    <button
                                        className={"btn btn-dark"}
                                        onClick={(e) => setSospechar(true)}
                                    >
                                        Sospechar
                                    </button>
                                </>
                            )
                        ) : null}
                        {sospechar ? <ListadeCartas /> : null}
                    </div>
                    {dado !== -1 ? <Dado numero={dado} /> : null}
                </div>
                <Tablero jugadores={jugadores} posDisponibles={posDisponibles} />
            </div>
            <DistribuirCartas cartas={cartas} />
        </div>
    );
}
