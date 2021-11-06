import { useState } from 'react'
import Ficha from './Ficha'
<<<<<<< HEAD
import { moverFicha, obtNombrejugador } from "../services"
import { useParams } from 'react-router'
=======
import { obtNombrejugador, moverFicha } from "../services"
>>>>>>> a173549f40247814c00553faf6a8db2bfbdd6212

function esEntrada(x, y) {
  if (x === 0 || x === 19) {
    if (y === 6 || y === 13) {
      return true
    }
  } else if (x === 6 || x === 13) {
    if (y === 0 || y === 19) {
      return true
    }
  }
  return false
}

function buscarJugadores(jugadores, x, y) {
  let res = Array.from(jugadores)

  res = res.filter(jugador => jugador.posX === x && jugador.posY === y)

  return res;
}

function esPosicionPosible(posPosibles, x, y) {
  if (posPosibles.findIndex(e => e.x === x && e.y === y) !== -1) {
    return true;
  }
  return false;
}

function miColor(jugadores) {
  return jugadores.find(e => e.nombre === obtNombrejugador()).color
}

export default function Casillero(props) {
  const [hovering, setHovering] = useState(false);

  return (
    <div 
      className={`casillero${esEntrada(props.x, props.y) ? " entrada" : ""}`}
      style={{
        gridColumnStart: props.x+1,
        gridRowStart: props.y+1
      }}
      onMouseOver={e => setHovering(true)}
      onMouseOut={e => setHovering(false)}
    >
      {buscarJugadores(props.jugadores, props.x, props.y).map((e, i) => (
        <Ficha key={i} color={e.color} />
      ))}
      {esPosicionPosible(props.posDisponibles, props.x, props.y) ?
<<<<<<< HEAD
      <div style={{opacity: hovering ? '50%' : '0%'}} onClick={moverFicha({X: props.x, Y: props.y, id_jugador: location.state.id_jugador, id_partida: params.id_partida })}>
=======
      <div style={{opacity: hovering ? '50%' : '0%', cursor: hovering ? 'pointer': ''}}
        onClick={e => {
          moverFicha({
            id_partida: props.id_partida,
            id_jugador: props.id_jugador,
            x: props.x,
            y: props.y
          }).then(() => props.setPosDisponibles([]));
        }}>
>>>>>>> a173549f40247814c00553faf6a8db2bfbdd6212
        <Ficha color={miColor(props.jugadores)} />
      </div> : null}
    </div>
  )
}