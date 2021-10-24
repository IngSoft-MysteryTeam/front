import React, { useState } from 'react';
import Chat from './Chat';
import ListaJugadores from './ListaJugadores';

export default function Lobby() {
  const test = [
    {
      id: 0,
      nombre: "Carlos",
      color: "#4285F4"
    },
    {
      id: 1,
      nombre: "Pedro",
      color: "#DB4437"
    },
    {
      id: 2,
      nombre: "Jose",
      color: "#F4B400"
    },
  ];

  const [jugadores, setJugadores] = useState(test);

  return (
    <div style={{maxWidth: '750px', margin: 'auto'}}>
      <h1>Nombre de la partida</h1>
      <div style={{display: 'flex'}}>
        <div style={{width: '300px', marginRight: '5px'}}>
          <ListaJugadores jugadores={jugadores} />
          <div style={{display: 'flex', marginTop: '10px'}}>
            <button className='btn btn-dark' style={{flexGrow: 1, marginRight: '5px'}} disabled={jugadores.length < 2 ? 'true' : ''}>
              Iniciar partida
            </button>
            <button className='btn btn-dark' style={{flexGrow: 1, marginLeft: '5px'}}>
              Abandonar partida
            </button>
          </div>
        </div>
        <Chat/>
      </div>
    </div>
  )
}