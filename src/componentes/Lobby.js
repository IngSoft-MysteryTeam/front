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
      <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap-reverse'}}>
        <div style={{flexGrow: 1, flexBasis: '300px'}}>
          <ListaJugadores jugadores={jugadores} />
          <div style={{display: 'flex', marginTop: '10px', columnGap: '10px'}}>
            <button className='btn btn-dark' style={{flexGrow: 1}} disabled={jugadores.length < 2 ? 'true' : ''}>
              Iniciar partida
            </button>
            <button className='btn btn-dark' style={{flexGrow: 1}}>
              Abandonar partida
            </button>
          </div>
        </div>
        <Chat/>
      </div>
    </div>
  )
}