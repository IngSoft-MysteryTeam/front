import React, { useState } from "react";
import { hacerSospecha } from "../services";
/**
 * Lista cartas para seleccionar y elegir una sospecha
 * @param  {object} props Id de jugador y de partida
 */
export default function ListadeCartas(props) {
    /**
     * Estado que guarda el nombre de la victima seleccionada
     * @param  {string} "" Nombre de la victima
     */
    const [victima, setVictima] = useState("");
    /**
     * Estado que guarda el nombre del monstruo seleccionado
     * @param  {string} "" Nombre del monstruo
     */
    const [monstruo, setMonstruo] = useState("");

    const victimas = [
        {
            nombre: "Conde",
            valor: "CONDE",
        },
        {
            nombre: "Condesa",
            valor: "CONDESA",
        },
        {
            nombre: "Ama de llaves",
            valor: "AMADELLAVES",
        },
        {
            nombre: "Mayordomo",
            valor: "MAYORDOMO",
        },
        {
            nombre: "Doncella",
            valor: "DONCELLA",
        },
        {
            nombre: "Jardinero",
            valor: "JARDINERO",
        },
    ];

    const monstruos = [
        {
            nombre: "Drácula",
            valor: "DRACULA",
        },
        {
            nombre: "Frankenstein",
            valor: "FRANKENSTEIN",
        },
        {
            nombre: "Hombre Lobo",
            valor: "HOMBRELOBO",
        },
        {
            nombre: "Fantasma",
            valor: "FANTASMA",
        },
        {
            nombre: "Momia",
            valor: "MOMIA",
        },
        {
            nombre: "Dr. Jekyll & Mr. Hyde",
            valor: "JEKYLLHYDE",
        },
    ];

    return (
        <>
            <div style={{ display: "flex" }}>
                <div style={{ width: "50%" }}>
                    <div style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                        <select
                            className="form-select form-select-sm"
                            onChange={(e) => setVictima(e.target.value)}
                            defaultValue=""
                        >
                            <option value="">Víctimas</option>
                            {victimas.map((e, i) => (
                                <option value={e.valor}>{e.nombre}</option>
                            ))}
                        </select>
                    </div>
                    {victima !== "" ? (
                        <img
                            style={{ marginTop: "10px" }}
                            src={`/cartas/${victima}.png`}
                            height="200px"
                            alt={victima}
                        />
                    ) : null}
                </div>
                <div style={{ width: "50%" }}>
                    <div style={{ paddingLeft: "5px", paddingRight: "5px" }}>
                        <select
                            className="form-select form-select-sm"
                            onChange={(e) => setMonstruo(e.target.value)}
                            defaultValue=""
                        >
                            <option value="">Monstruos</option>
                            {monstruos.map((e, i) => (
                                <option value={e.valor}>{e.nombre}</option>
                            ))}
                        </select>
                    </div>
                    {monstruo !== "" ? (
                        <img
                            style={{ marginTop: "10px" }}
                            src={`/cartas/${monstruo}.png`}
                            height="200px"
                            alt={monstruo}
                        />
                    ) : null}
                </div>
            </div>
            <div>
                {victima !== "" && monstruo !== "" ? (
                    <button
                        className={"btn btn-dark"}
                        onClick={(e) =>
                            hacerSospecha({
                                victima: victima,
                                monstruo: monstruo,
                                id_jugador: props.id_jugador,
                                id_partida: props.id_partida,
                            })
                        }
                    >
                        Enviar Sospecha
                    </button>
                ) : null}
            </div>
        </>
    );
}
