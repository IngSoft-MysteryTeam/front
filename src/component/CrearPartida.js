import React, { useState } from "react";
import { useHistory } from "react-router";
import { nuevaPartida, obtNombrejugador } from "../services";

/**
 * Permite al jugador crear nueva partida
 * @returns Renderizado JSX
 */
export default function CreaPartida() {
    /**
     * Ayuda a redireccionar al jugador a la partida creada
     */
    const history = useHistory();
    /**
     * Guarda el nombre del jugador creador de la partida
     */
    const jugador = obtNombrejugador();
    /**
     * Guardamos el nombre de la nueva partida
     * @param  {""} Cadena de caracteres
     * @param  {object} Nombre de la partida
     */
    const [newpartida, setNombre] = useState({
        nombre: "",
    });
    /**
     * Nos permite visualizar los input por teclado del usuario en consola
     * y guardarlos en la constante "newpartida"
     * @param  {Evento} evento Evento generado por input del usuario.
     */
    const controlEvents = (evento) => {
        console.log(evento.target.value);
        setNombre({
            ...newpartida,
            [evento.target.name]: evento.target.value,
        });
    };

    /**
     * Envia la partida al back
     * @param {Evento} evento Evento del click
     */
    const enviarPartida = (evento) => {
        evento.preventDefault();
        nuevaPartida({
            nombre: newpartida.nombre,
            anfitrion: jugador,
        })
            .then((res) => {
                if (res.status === 200) {
                    history.push({
                        pathname: `/partidas/${res.data.id_partida}`,
                        state: { ...res.data, nombre: newpartida.nombre },
                    });
                }
            })
            .catch((err) => {
                alert("Ocurrió un error. Revise la consola.");
                console.error(err);
            });
    };

    return (
        <div
            className="card card-body"
            style={{ maxWidth: "700px", margin: "auto" }}
        >
            <h2 style={{ textAlign: "center", color: "black" }}>
                CREAR PARTIDA
            </h2>
            <br />
            <form className="row" onSubmit={enviarPartida}>
                <input
                    placeholder="Escribe un Nombre"
                    className="form-control"
                    type="text"
                    name="nombre"
                    onChange={controlEvents}
                    required
                />
                <button className="btn btn-dark" type="submit">
                    Crear
                </button>
            </form>
        </div>
    );
}
