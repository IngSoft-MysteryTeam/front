import React, { useState } from 'react';
import BotonCrear from './BotonCrear';
import BotonUnirse from './BotonUnirse';
import "bootstrap-icons/font/bootstrap-icons.css";

export default function ListaPartidas() {
  const test = [
    {
      id_partida: 0,
      nombre_partida: "Prueba 1",
      anfitrion: "Carlitos",
      cant_jugadores: 3
    },
    {
      id_partida: 1,
      nombre_partida: "Prueba 2",
      anfitrion: "Pepito",
      cant_jugadores: 2
    },
    {
      id_partida: 2,
      nombre_partida: "Prueba 3",
      anfitrion: "Juancito",
      cant_jugadores: 5
    },
    {
      id_partida: 2,
      nombre_partida: "Prueba 3",
      anfitrion: "Pedrito",
      cant_jugadores: 6
    }
  ];

  const [partidas, setPartidas] = useState(test);

  return (
    <div style={{maxWidth: '750px', margin: 'auto'}}>
      <h1>Unirse a una partida</h1>
      <table className='tablaPartidas'>
        <thead>
          <tr>
          <th width='50%'>Partida</th>
          <th>Anfitrión</th>
          <th width='130px'>Cant. Jugadores</th>
          </tr>
        </thead>
        <tbody>
          {partidas.map((e, key) => (
            <tr key={key}>
              <td>{e.nombre_partida}</td>
              <td>{e.anfitrion}</td>
              <td><i className="bi-people-fill"></i> {e.cant_jugadores}/6</td>
              <td><BotonUnirse/></td>
            </tr>
          ))}
          {
          partidas.length === 0 ? 
            <tr style={{pointerEvents: 'none'}}>
              <td colSpan={3}><i style={{color: 'gray'}}>No hay partidas</i></td>
            </tr>
          : null}
        </tbody>
      </table>
      <BotonCrear />
    </div>
  )
}