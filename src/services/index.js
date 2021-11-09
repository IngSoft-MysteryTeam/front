import axios from "axios";

const baseUrl = "http://localhost:8000/";
/**
 * Envia al back el nombre ingresado por el usuario
 * @param  {object} nombre Nombre elegido por el usuario
 */
export function nuevoJugador(nombre) {
    return axios({
        url: `${baseUrl}`,
        method: "POST",
        data: nombre,
    });
}
/**
 * Solicita al back la lista de partidas
 */
export function traerPartidas() {
    return axios({
        url: `${baseUrl}partidas/`,
        method: "GET",
    });
}
/**
 * Envia la nueva partida creada al back
 * @param  {object} datos Nombre ingresado por el usuario
 */
export function nuevaPartida(datos) {
    return axios({
        url: `${baseUrl}nueva-partida/`,
        method: "POST",
        data: datos,
    });
}
/**
 * Envia el nombre del jugador al back indicando a la partida que se quiere unir
 * @param  {object} datos Contiene nombre de jugador y el id de la partida
 */
export function unirJugador(datos) {
    return axios({
        url: `${baseUrl}partida/${datos.id_partida}/unirse`,
        method: "POST",
        data: { nombre: datos.nombre },
    });
}
/**
 * Indica al back que la partida inicie
 * @param  {object} datos Id de la partida
 */
export function iniciarPartida(datos) {
    return axios({
        url: `${baseUrl}partida/${datos.id_partida}/iniciar`,
        method: "PUT",
    });
}
/**
 * Indica al back que termino el turno de un jugador
 * @param  {object} datos Id de la partida
 */
export function pasarTurno(datos) {
    return axios({
        url: `${baseUrl}partida/${datos.id_partida}/pasarturno`,
        method: "PUT",
    });
}
/**
 * Solicita al back el resultado de tirar el dado
 * @param  {object} datos Id de la partida
 */
export function obtDado(datos) {
    return axios({
        url: `${baseUrl}partida/${datos.id_partida}/${datos.id_jugador}/tirardado`,
        method: "GET",
    });
}
/**
 * Obtiene el nombre del jugador desde la cookie
 */
export function obtNombrejugador() {
    return sessionStorage.getItem("NombreJugador");
}
/**
 * Guarda en la cookie el nombre del nuevo jugador
 * @param  {object} datos Nombre del jugador
 */
export function asigNombrejugador(datos) {
    return sessionStorage.setItem("NombreJugador", datos.nombre);
}
/**
 * Envia al back la posicion a donde se mueve el jugador en el tablero
 * @param  {object} datos Id de partida y jugador, posicion en el tablero
 */
export function moverFicha(datos) {
    return axios({
        url: `${baseUrl}partida/${datos.id_partida}/${datos.id_jugador}/moverficha`,
        method: "PUT",
        data: { x: datos.x, y: datos.y },
    });
}
/**
 * Envia al back el monstruo, victima y recinto para hacer una sospecha
 * @param  {object} datos Id de partida y jugador, monstruo y victima
 */
export function hacerSospecha(datos) {
    return axios({
        url: `${baseUrl}partida/${datos.id_partida}/${datos.id_jugador}/sospechar`,
        method: "GET",
        params: { victima: datos.victima, monstruo: datos.monstruo },
    });
}

/**
 * Envia al back la accion de entrar a un recinto
 * @param {object} datos Id de partida y jugador
 * @returns
 */
export function entrarRecinto(datos) {
    return axios({
        url: `${baseUrl}partida/${datos.id_partida}/${datos.id_jugador}/entrar-recinto`,
        method: "PUT",
    });
}
