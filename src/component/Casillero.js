import { useState } from 'react'
import Ficha from './Ficha'
import { obtNombrejugador, moverFicha } from "../services"

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
      <div style={{opacity: hovering ? '50%' : '0%', cursor: hovering ? 'pointer': ''}} 
        onClick={e => {
          moverFicha({
            id_partida: props.id_partida,
            id_jugador: props.id_jugador,
            x: props.x,
            y: props.y
          });
          props.setPosDisponibles([]);
        }}>
        <Ficha color={miColor(props.jugadores)} />
      </div> : null}
    </div>
  )
}