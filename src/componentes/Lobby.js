import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import Chat from './Chat';
import ListaJugadores from './ListaJugadores';

export default function Lobby() {
  const params = useParams();
  const location = useLocation();
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    setJugadores(location.state.jugadores);
    console.log(location.state.jugadores)
    /* const socket = new WebSocket(`ws://localhost:8000/partida/${params.id}`);
    socket.addEventListener('open', e => console.log("Conexion establecida"));
    socket.addEventListener('message', msg => console.log(`Mensaje: ${msg.data}`));
    socket.addEventListener('close', e => console.log("Se cayo la conexion")); */

  }, [location.state.jugadores, params.id])


  return (
    <div style={{maxWidth: '750px', margin: 'auto'}}>
      <h1>{location.state.nombre}</h1>
      <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap-reverse'}}>
        <div style={{flexGrow: 1, flexBasis: '300px'}}>
          <ListaJugadores jugadores={jugadores} />
          <div style={{display: 'flex', marginTop: '10px', columnGap: '10px'}}>
            <button className='btn btn-dark' disabled={jugadores.length < 2}>
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