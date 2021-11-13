import React, { useState } from "react";
import { useHistory } from "react-router";
import { nuevaPartida, obtNombrejugador } from "../services";
import SelectorColores from "./SelectorColores";

/**
 * Permite al jugador crear nueva partida.
 * @returns Renderizado JSX
 */
export default function CreaPartida() {
    /**
     * Ayuda a redireccionar al jugador a la partida creada.
     */
    const history = useHistory();
    /**
     * Guarda el nombre del jugador creador de la partida.
     */
    const jugador = obtNombrejugador();
    /**
     * Guardamos el nombre de la nueva partida
     * @param  {""} Cadena de caracteres
     * @param  {object} Nombre de la partida
     */
    const [nombre, setNombre] = useState(null);
    /**
     * Se guarda el color elegido
     */
    const [color, setColor] = useState(null);
    /**
     * Se guarda la contraseña.
     */
    const [contraseña, setContraseña] = useState(null);

    const colores = [
        "#4285F4",
        "#DB4437",
        "#F4B400",
        "#0F9D58",
        "#AB47BC",
        "#26C6DA",
    ];

    /**
     * Envía la partida al back
     * @param {Evento} evento Evento del click
     */
    const enviarPartida = () => {
        nuevaPartida({
            nombre: nombre,
            anfitrion: jugador,
            color: color,
            contraseña: contraseña,
        })
            .then((res) => {
                if (res.status === 200) {
                    history.push({
                        pathname: `/partidas/${res.data.id_partida}`,
                        state: { ...res.data, nombre: nombre, contraseña: contraseña },
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
            style={{
                width: "750px",
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                rowGap: "15px",
                border: "1px solid rgb(100, 100, 100)",
                padding: "15px",
            }}
        >
            <h1>CREAR PARTIDA</h1>
            <input
                required
                placeholder="Escribe un nombre..."
                onChange={(e) => setNombre(e.target.value)}
                style={{ width: "500px" }}
            />
            <input
                placeholder="Contraseña"
                type="password"
                onChange={(e) => setContraseña(e.target.value)}
                style={{ width: "500px" }}
            />
            <SelectorColores colores={colores} setColor={setColor} />
            <button
                className="btn btn-dark"
                onClick={(e, key) => enviarPartida()}
                disabled={!(nombre && color)
                }
            >
                Crear partida
            </button>
        </div>
    );
}
