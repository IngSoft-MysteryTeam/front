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
import Sospechar from "./BotonSospechar";
import EntrarRecinto from "./BotonEntrarRecinto";
import MostrarSospecha from "./MostrarSospecha";
import BotonAcusar from "./BotonAcusar";
import ListadeCartasAcusacion from "./ListadeCartasAcusacion";
import MostrarAcusacion from "./MostrarAcusacion";

/**
 * Devuelve true si las coordenadas dadas corresponden a
 * las de una entrada.
 * @param {int} x
 * @param {int} y
 * @returns {boolean}
 */
function estaEnUnaEntrada(x, y) {
    const entradas = [
        {
            x: 4,
            y: 6,
        },
        {
            x: 3,
            y: 13,
        },
        {
            x: 6,
            y: 10,
        },
        {
            x: 6,
            y: 2,
        },
        {
            x: 6,
            y: 15,
        },
        {
            x: 10,
            y: 6,
        },
        {
            x: 13,
            y: 4,
        },
        {
            x: 13,
            y: 10,
        },
        {
            x: 13,
            y: 16,
        },
        {
            x: 15,
            y: 6,
        },
        {
            x: 10,
            y: 13,
        },
        {
            x: 16,
            y: 13,
        },
    ];

    let entrada = entradas.find((e) => e.x === x && e.y === y);

    if (entrada) {
        return true;
    } else {
        return false;
    }
}

/**
 * Esta función visualiza la partida a los jugadores que se han unido.
 * @returns Renderizado de una partida particular del juego.
 */
export default function Lobby() {
    /**
     * Nos indica los parámetros para armar la url de la partida.
     */
    const params = useParams();
    /**
     * Nos indica el id del jugador para armar la url de la partida.
     */
    const location = useLocation();
    /**
     * Estado que guarda el nombre de los jugadores de la partida.
     * @param  {List} location.state.jugadores Jugadores en la partida
     */
    const [jugadores, setJugadores] = useState(location.state.jugadores);
    /**
     * Estado que nos indica el turno del jugador
     * @param  {int} null Número que indica el orden del jugador
     */
    const [turno, setTurno] = useState(null);
    /**
     * Estado que indica si lanzó el dado un jugador y guarda el valor obtenido.
     * @param  {int} -1 Número del dado
     */
    const [dado, setDado] = useState(-1);
    /**
     * Estado que nos indica las cartas que le tocaron al jugador
     * @param  {List} [] Lista de cartas
     */
    const [cartas, setCartas] = useState([]);
    /**
     * Estado que indica si el jugador está sospechando.
     * @param  {bool} false
     */
    const [sospechando, setSospechando] = useState(false);
    /* params.id viene de la url de donde estas parado */

    /**
     * Estado que indica si el jugador está acusando.
     * @param  {bool} false
     */
    const [acusando, setAcusando] = useState(false);

    /**
     * Estado que guarda la acusacion de un jugador
     * @param {object} null nombre jugador, cartas y si es correcta la acusacion.
     */
    const [acusar, setAcusar] = useState(null);
    /**
     * Estado que indica las posiciones a las que se puede mover
     * el jugador que tiró el dado.
     * @param  {bool} false
     */
    const [posPosibles, setPosPosibles] = useState([]);

    /**
     * Estado que guarda la sospecha realizada por un jugador
     * @param  {object} null Cartas y nombre del jugador
     */
    const [sospecha, setSospecha] = useState(null);

    const [respuestaSospecha, setRespuestaSospecha] = useState(null);

    const [respondiendoSospecha, setRespondiendoSospecha] = useState(null);

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
                setAcusar(null);
                setSospecha(null);
                setTurno(json.turno);
                setDado(-1);
                setRespuestaSospecha(null);
            } else if (json.evento === "Tiraron el dado") {
                setDado(json.valor);
            } else if (json.evento === "Reparto de cartas") {
                console.log(json.cartas);
                setCartas(json.cartas);
            } else if (json.evento === "Nueva posicion") {
                setJugadores((oldJugadores) => {
                    let newJugadores = oldJugadores.map((e, i) => {
                        if (e.nombre === json.nombre) {
                            return {
                                ...e,
                                posX: json.x,
                                posY: json.y,
                                recinto: json.recinto,
                            };
                        } else return e;
                    });
                    return newJugadores;
                });
            } else if (json.evento === "Nueva sospecha") {
                setSospecha({ nombre: json.nombre, cartas: json.cartas, id_jugador: json.id_jugador });
            } else if (json.evento === "Nueva acusacion") {
                setAcusar({
                    nombre: json.nombre,
                    cartas: json.cartas,
                    correcta: json.correcta,
                });
            } else if (json.evento === "Carta de sospecha") {
                setRespuestaSospecha({
                    nombre: json.nombreResponde,
                    carta: json.carta,
                });
            } else if (json.evento === "Responder sospecha") {
                setRespondiendoSospecha({
                    cartas: json.cartas,
                    id_responde: jugadores.find(
                        (e) => e.nombre === obtNombrejugador()
                    ).id_jugador
                });
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
                                <BotonDado
                                    id_partida={params.id}
                                    id_jugador={location.state.id_jugador}
                                    setPosPosibles={setPosPosibles}
                                />
                            ) : (
                                <>
                                    {!sospechando ? (
                                        <BotonAcusar
                                            acusando={setAcusando}
                                            eligoacusar={acusando}
                                        />
                                    ) : null}
                                    {acusando ? (
                                        <ListadeCartasAcusacion
                                            id_jugador={
                                                location.state.id_jugador
                                            }
                                            id_partida={params.id}
                                            setSospecha={setSospecha}
                                        />
                                    ) : null}
                                    <PasarTurno
                                        id_partida={params.id}
                                        sospechando={setSospechando}
                                        acusando={setAcusando}
                                    />
                                    {estaEnUnaEntrada(
                                        jugadores.find(
                                            (e) =>
                                                e.nombre === obtNombrejugador()
                                        ).posX,
                                        jugadores.find(
                                            (e) =>
                                                e.nombre === obtNombrejugador()
                                        ).posY
                                    ) &&
                                    jugadores.find(
                                        (e) => e.nombre === obtNombrejugador()
                                    ).recinto === "" ? (
                                        <EntrarRecinto
                                            id_partida={params.id}
                                            id_jugador={
                                                location.state.id_jugador
                                            }
                                        />
                                    ) : null}
                                    {jugadores.find(
                                        (e) => e.nombre === obtNombrejugador()
                                    ).recinto &&
                                    !sospecha &&
                                    !acusando ? (
                                        <Sospechar
                                            sospechando={setSospechando}
                                            eligosospechar={sospechando}
                                        />
                                    ) : null}
                                </>
                            )
                        ) : null}
                        {sospechando ? (
                            <ListadeCartas
                                id_jugador={location.state.id_jugador}
                                id_partida={params.id}
                                sospechando={setSospechando}
                            />
                        ) : null}
                    </div>
                    {dado !== -1 ? <Dado numero={dado} /> : null}
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {sospecha ? (
                        <MostrarSospecha
                            sospecha={sospecha}
                            respuestaSospecha={respuestaSospecha}
                            respondiendoSospecha={respondiendoSospecha}
                            setRespondiendoSospecha={setRespondiendoSospecha}
                        />
                    ) : null}
                    {acusar ? <MostrarAcusacion acusar={acusar} /> : null}
                    <Tablero
                        jugadores={jugadores}
                        posPosibles={posPosibles}
                        setPosPosibles={setPosPosibles}
                        id_partida={params.id}
                        id_jugador={location.state.id_jugador}
                    />
                </div>
            </div>
            <DistribuirCartas cartas={cartas} />
        </div>
    );
}
