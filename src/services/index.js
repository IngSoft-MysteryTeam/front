import axios from "axios";

const baseUrl = "http://localhost:8000/";

export function nuevoJugador(nombre) {
    return axios({
        url: `${baseUrl}`,
        method: "POST",
        data: nombre,
    });
}

export function traerPartidas() {
    return axios({
        url: `${baseUrl}partidas/`,
        method: "GET",
    });
}

export function nuevaPartida(datos) {
    return axios({
        url: `${baseUrl}nueva-partida/`,
        method: "POST",
        data: datos,
    });
}

export function unirJugador(datos) {
    return axios({
        url: `${baseUrl}partida/${datos.id_partida}/unirse`,
        method: "POST",
        data: { nombre: datos.nombre },
    });
}

export function iniciarPartida(datos) {
    return axios({
        url: `${baseUrl}partida/${datos.id_partida}/iniciar`,
        method: "PUT",
    });
}

export function pasarTurno(datos) {
    return axios({
        url: `${baseUrl}partida/${datos.id_partida}/pasarturno`,
        method: "PUT",
    });
}

export function obtDado(datos) {
    return axios({
        url: `${baseUrl}partida/${datos.id_partida}/tirardado`,
        method: "GET",
    });
}
