import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import Iniciar from "./BotonIniciar";
import PasarTurno from "./BotonPasarTurno";
import Chat from "./Chat";
import Dado from "./Dado";
import BotonDado from "./BotonDado";
import ListaJugadores from "./ListaJugadores";

export default function Lobby() {
    const params = useParams();
    const location = useLocation();
    const [jugadores, setJugadores] = useState(location.state.jugadores);
    const [iniciada, setIniciada] = useState(false);
    const [turno, setTurno] = useState(null);
    const [dado, setDado] = useState(-1);
    /* params.id viene de la url de donde estas parado */
    useEffect(() => {
        setJugadores(location.state.jugadores);
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
                if (
                    jugadores.findIndex(
                        (e) => e.nombre === json.jugador.nombre
                    ) === -1
                ) {
                    setJugadores((oldJugadores) => [
                        ...oldJugadores,
                        json.jugador,
                    ]);
                }
            } else if (json.evento === "Jugador desconectado") {
                setJugadores((oldJugadores) =>
                    oldJugadores.filter((e) => e.nombre !== json.jugador.nombre)
                );
            } else if (json.evento === "Comenzo la partida") {
                setIniciada(true);
            } else if (json.evento === "Nuevo turno") {
                setTurno(json.turno);
            } else if (json.evento === "Tiraron el dado") {
                setDado(json.valor);
            }
        });
        socket.addEventListener("close", (e) =>
            console.log("Se cayo la conexion")
        );
    }, []);

    return (
        <div style={{ maxWidth: "750px", margin: "auto" }}>
            <h1>{location.state.nombre}</h1>
            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap-reverse",
                    alignItems: "flex-end",
                }}
            >
                <div style={{ flexGrow: 1, flexBasis: "300px" }}>
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
                        {jugadores[0].nombre ===
                            sessionStorage.getItem("NombreJugador") &&
                        !iniciada ? (
                            <Iniciar
                                id_partida={params.id}
                                cantjugadores={jugadores.length}
                            />
                        ) : null}
                        <button className="btn btn-dark">
                            Abandonar partida
                        </button>
                        {iniciada ? (
                            <>
                                <BotonDado id_partida={params.id} />
                                <PasarTurno id_partida={params.id} />
                            </>
                        ) : null}
                    </div>
                    {dado !== -1 ? <Dado numero={dado} /> : null}
                </div>
                <Chat />
            </div>
        </div>
    );
}
