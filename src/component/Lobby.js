import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { obtenerSumario, obtNombrejugador } from "../services";
import Iniciar from "./BotonIniciar";
import PasarTurno from "./BotonPasarTurno";
import Dado from "./Dado";
import BotonDado from "./BotonDado";
import BotonAcusar from "./BotonAcusar";
import ListaJugadores from "./ListaJugadores";
import ListadeCartasSospecha from "./ListadeCartasSospecha";
import ListadeCartasAcusacion from "./ListadeCartasAcusacion";
import DistribuirCartas from "./DistribuirCartas";
import Tablero from "./Tablero";
import Sospechar from "./BotonSospechar";
import EntrarRecinto from "./BotonEntrarRecinto";
import MostrarSospecha from "./MostrarSospecha";
import MostrarAcusacion from "./MostrarAcusacion";
import Informe from "./Informe";
import MostrarCartaMisterio from "./MostrarCartaMisterio";
import MostrarPerdioCarta from "./MostrarPerdioCarta";
import Chat from "./Chat";
import Sumario from "./Sumario";
import PartidaCancelada from "./PartidaCancelada";
import AbandonoPartida from "./AbandonoPartida";

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
 * Esta funci??n visualiza la partida a los jugadores que se han unido.
 * @returns Renderizado de una partida particular del juego.
 */
export default function Lobby() {
    /**
     * Nos indica los par??metros para armar la url de la partida.
     */
    const params = useParams();
    /**
     * Nos indica el id del jugador para armar la url de la partida.
     */
    const location = useLocation();
    /**
     * Estado que guarda toda la entidad los jugadores de la partida.
     * con todos sus atributos.
     * @param  {List} location.state.jugadores Jugadores en la partida
     */
    const [jugadores, setJugadores] = useState(location.state.jugadores);
    /**
     * Estado que nos indica el numero de orden en la partida del jugador.
     * @param  {int} null N??mero que indica el orden del jugador
     */
    const [turno, setTurno] = useState(null);
    /**
     * Estado que indica si es el turno de un jugador.
     * @param  {bool} false
     */
    const [miturno, setMiturno] = useState(false);
    /**
     * Estado que indica si lanz?? el dado un jugador y guarda el valor obtenido.
     * @param  {int} -1 N??mero del dado
     */
    const [dado, setDado] = useState(-1);
    /**
     * Estado que nos indica las cartas que le tocaron al jugador
     * @param  {List} [] Lista de cartas
     */
    const [cartas, setCartas] = useState([]);
    /**
     * Estado que indica si el jugador est?? sospechando.
     * @param  {bool} false
     */
    const [sospechando, setSospechando] = useState(false);
    /* params.id viene de la url de donde estas parado */

    /**
     * Estado que guarda la sospecha realizada por un jugador
     * @param  {object} null Cartas y nombre del jugador
     */
    const [sospecha, setSospecha] = useState(null);

    /**
     * Estado que indica si el jugador est?? acusando.
     * @param  {bool} false
     */
    const [acusando, setAcusando] = useState(false);

    /**
     * Estado que guarda la acusacion de un jugador
     * @param {object} null nombre jugador, cartas
     *  y si es correcta la acusacion.
     */
    const [acusar, setAcusar] = useState(null);
    /**
     * Estado que indica las posiciones a las que se puede mover
     * el jugador que tir?? el dado.
     * @param  {bool} false
     */
    const [posPosibles, setPosPosibles] = useState([]);

    /**
     * Estado que guarda la carta que responde el jugador que tiene
     * una coincidencia con la sospecha.
     * @param  {object} null
     */
    const [respuestaSospecha, setRespuestaSospecha] = useState(null);
    /**
     * Estado que guarda las cartas que se elegieron para realizar una sospecha.
     * @param  {object} null
     */
    const [respondiendoSospecha, setRespondiendoSospecha] = useState(null);
    /**
     * Estado que indica si un jugador perdio.
     * @param  {bool} false
     */
    const [perdio, setPerdio] = useState(false);
    /**
     * Estado que indica si la partida termino.
     * @param  {bool} false
     */
    const [findepartida, setFindepartida] = useState(false);
    /**
     * Estado que indica si el jugador es el ??nico que no perdi??
     * @param  {bool} false
     */
    const [ultimoJugador, setUltimoJugador] = useState(false);
    /**
     * Estado que guarda el nombre del jugador que tiene la bruja de Salem.
     * @param  {objet} null
     */
    const [salem, setSalem] = useState(null);
    /**
     * Estado que indica si uso o no la bruja de Salem.
     * @param  {bool} null
     */
    const [perdioBruja, setPerdioBruja] = useState(null);
    /**
     * Estado que guarda los mensajes enviados por websocket desde el back.
     * @param  {List} []
     */
    const [mensajesChat, setMensajesChat] = useState([]);
    /**
     * Estado que guarda la informacion del sumario
     * @param  {objet} null
     */
    const [sumario, setSumario] = useState(null);
    /**
     * Estado que indica si abandono el anfitrion
     * @param {}
     */
    const [cancelada, setCancelada] = useState(false);
    /**
     * Estado que indica que un jugador abandono la partida
     * @param  {List} []
     */
    const [abandonoPartida, setAbandonoPartida] = useState([]);

    useEffect(() => {
        const urlbase = "ws://localhost:8000/partida/";
        const socket = new WebSocket(
            `${urlbase}${params.id}/${location.state.id_jugador}`
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
                setJugadores((oldJugadores) => {
                    if (oldJugadores.filter((e) => !e.perdio).length === 2) {
                        setUltimoJugador(true);
                    }
                    return oldJugadores.filter(
                        (e) => e.nombre !== json.jugador
                    );
                });
                if (
                    json.jugador === location.state.anfitrion &&
                    json.turno === null &&
                    !findepartida
                ) {
                    setCancelada(true);
                } else if (json.turno) {
                    setAbandonoPartida((old) => [
                        ...old,
                        {
                            nombre: json.jugador,
                            cartas: json.cartas,
                        },
                    ]);
                }
            } else if (json.evento === "Nuevo turno") {
                if (json.nombre === obtNombrejugador()) {
                    setMiturno(true);
                } else {
                    setMiturno(false);
                }
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
                setSospecha({
                    nombre: json.nombre,
                    cartas: json.cartas,
                    id_jugador: json.id_jugador,
                    nombreResponde: json.nombreResponde,
                });
            } else if (json.evento === "Nueva acusacion") {
                setAcusar({
                    nombre: json.nombre,
                    cartas: json.cartas,
                    correcta: json.correcta,
                });
                if (!json.correcta) {
                    setJugadores((oldJugadores) => {
                        let newJugadores = oldJugadores.map((e) => {
                            if (e.nombre === json.nombre) {
                                return {
                                    ...e,
                                    perdio: true,
                                };
                            } else return e;
                        });
                        if (
                            newJugadores.filter((e) => !e.perdio).length === 1
                        ) {
                            setUltimoJugador(true);
                        } else if (
                            newJugadores.filter((e) => !e.perdio).length === 0
                        ) {
                            setFindepartida(true);
                        }
                        return newJugadores;
                    });
                    if (obtNombrejugador() === json.nombre) {
                        setPerdio(true);
                    }
                } else {
                    setFindepartida(true);
                }
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
                    ).id_jugador,
                });
            } else if (json.evento === "Bruja Salem") {
                setSalem((oldSalem) => ({
                    ...oldSalem,
                    nombre: json.nombre,
                    carta: json.carta_misterio,
                }));
                setCartas((oldCartas) =>
                    oldCartas.filter((e) => e !== "BRUJASALEM")
                );
            } else if (json.evento === "Jugo la Bruja") {
                setSalem((oldSalem) => ({ ...oldSalem, nombre: json.nombre }));
            } else if (json.evento === "Perdio bruja") {
                setPerdioBruja(json.nombre);
                if (json.nombre === obtNombrejugador()) {
                    setCartas((oldCartas) =>
                        oldCartas.filter((e) => e !== "BRUJASALEM")
                    );
                }
            } else if (json.evento === "Nuevo mensaje") {
                setMensajesChat((oldMensajesChat) => [
                    ...oldMensajesChat,
                    {
                        nombre: json.nombre,
                        texto: json.texto,
                        color: json.color,
                    },
                ]);
            }
        });
        socket.addEventListener("close", (e) =>
            console.log("Se cayo la conexion")
        );
    }, [location.state.id_jugador, params.id]);

    useEffect(() => {
        if (findepartida) {
            obtenerSumario({ id_partida: params.id }).then((res) => {
                console.log(res.data);
                setSumario(res.data);
            });
        }
    }, [findepartida]);

    return (
        <div style={{ maxWidth: "1500px", margin: "auto" }}>
            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                }}
            >
                <div
                    style={{
                        flexGrow: 1,
                        flexBasis: "100px",
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "10px",
                    }}
                >
                    <h1>{location.state.nombre}</h1>
                    <ListaJugadores
                        jugadores={jugadores}
                        anfitrion={location.state.anfitrion}
                        turno={turno}
                    />
                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            flexWrap: "wrap",
                        }}
                    >
                        {turno === null &&
                        !findepartida &&
                        location.state.anfitrion === obtNombrejugador() ? (
                            <Iniciar
                                id_partida={params.id}
                                cantjugadores={jugadores.length}
                            />
                        ) : null}
                        {turno != null &&
                        jugadores.find((e) => e.orden === turno).nombre ===
                            obtNombrejugador() &&
                        !perdio &&
                        !findepartida ? (
                            <>
                                {dado === -1 ? (
                                    <>
                                        {!ultimoJugador ? (
                                            <BotonDado
                                                id_partida={params.id}
                                                id_jugador={
                                                    location.state.id_jugador
                                                }
                                                setPosPosibles={setPosPosibles}
                                            />
                                        ) : null}
                                    </>
                                ) : (
                                    <>
                                        {!ultimoJugador ? (
                                            <PasarTurno
                                                id_partida={params.id}
                                                id_jugador={
                                                    location.state.id_jugador
                                                }
                                                sospechando={setSospechando}
                                                acusando={setAcusando}
                                            />
                                        ) : null}
                                        {estaEnUnaEntrada(
                                            jugadores.find(
                                                (e) =>
                                                    e.nombre ===
                                                    obtNombrejugador()
                                            ).posX,
                                            jugadores.find(
                                                (e) =>
                                                    e.nombre ===
                                                    obtNombrejugador()
                                            ).posY
                                        ) &&
                                        jugadores.find(
                                            (e) =>
                                                e.nombre === obtNombrejugador()
                                        ).recinto === "" &&
                                        !ultimoJugador ? (
                                            <EntrarRecinto
                                                id_partida={params.id}
                                                id_jugador={
                                                    location.state.id_jugador
                                                }
                                            />
                                        ) : null}
                                        {jugadores.find(
                                            (e) =>
                                                e.nombre === obtNombrejugador()
                                        ).recinto &&
                                        !sospecha &&
                                        !acusando &&
                                        !ultimoJugador &&
                                        !sospechando ? (
                                            <Sospechar
                                                setSospechando={setSospechando}
                                            />
                                        ) : null}
                                    </>
                                )}
                                {!sospechando && !sospecha && !acusando ? (
                                    <BotonAcusar setAcusando={setAcusando} />
                                ) : null}
                            </>
                        ) : null}
                    </div>
                    <Chat
                        id_partida={params.id}
                        mensajesChat={mensajesChat}
                        disabled={perdio}
                    />
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
                    {acusar ? (
                        findepartida && sumario ? (
                            <Sumario sumario={sumario} />
                        ) : (
                            <MostrarAcusacion
                                acusar={acusar}
                                setacusar={setAcusar}
                            />
                        )
                    ) : null}
                    {salem ? (
                        <MostrarCartaMisterio
                            cartamisterio={salem.carta}
                            jugosalem={salem.nombre}
                            setSalem={setSalem}
                        />
                    ) : null}
                    {perdioBruja ? (
                        <MostrarPerdioCarta
                            nombre={perdioBruja}
                            setPerdioBruja={setPerdioBruja}
                        />
                    ) : null}
                    {acusando ? (
                        <ListadeCartasAcusacion
                            id_jugador={location.state.id_jugador}
                            id_partida={params.id}
                            setAcusando={setAcusando}
                            setSospecha={setSospecha}
                        />
                    ) : null}
                    {sospechando ? (
                        <ListadeCartasSospecha
                            id_jugador={location.state.id_jugador}
                            id_partida={params.id}
                            setSospechando={setSospechando}
                            sospechando={sospechando}
                        />
                    ) : null}
                    {dado !== -1 ? <Dado numero={dado} /> : null}
                    {cancelada ? <PartidaCancelada /> : null}
                    {abandonoPartida.map((e, i) => (
                        <AbandonoPartida
                            nombre={e.nombre}
                            cartas={e.cartas}
                            key={i}
                            setAbandonoPartida={setAbandonoPartida}
                        />
                    ))}
                    <Tablero
                        jugadores={jugadores}
                        posPosibles={posPosibles}
                        setPosPosibles={setPosPosibles}
                        id_partida={params.id}
                        id_jugador={location.state.id_jugador}
                    />
                </div>
                <Informe iniciada={!(turno === null)}></Informe>
            </div>
            <DistribuirCartas
                miturno={miturno}
                cartas={cartas}
                id_partida={params.id}
                id_jugador={location.state.id_jugador}
            />
        </div>
    );
}
