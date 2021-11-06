import { useState } from 'react'
import Ficha from './Ficha'
import { obtNombrejugador, moverFicha } from "../services"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowLeft, faArrowRight, faArrowUp } from '@fortawesome/free-solid-svg-icons'

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

function esEntradaRecinto(x, y) {
  const entradas = [
    {
      x: 4,
      y: 6,
      color: "#3F3C29",
      direccion: faArrowDown
    },
    {
      x: 3,
      y: 13,
      color: "#3F3C29",
      direccion: faArrowUp
    },
    {
      x: 6,
      y: 10,
      color: "#3F3C29",
      direccion: faArrowLeft
    },
    {
      x: 6,
      y: 2,
      color: "black",
      direccion: faArrowLeft
    },
    {
      x: 6,
      y: 15,
      color: "black",
      direccion: faArrowLeft
    },
    {
      x: 10,
      y: 6,
      color: "#943C29",
      direccion: faArrowUp
    },
    {
      x: 13,
      y: 4,
      color: "black",
      direccion: faArrowRight,
    },
    {
      x: 13,
      y: 10,
      color: "#3F3C29",
      direccion: faArrowRight,
    },
    {
      x: 13,
      y: 16,
      color: "black",
      direccion: faArrowRight,
    },
    {
      x: 15,
      y: 6,
      color: "#3F3C29",
      direccion: faArrowDown
    },
    {
      x: 10,
      y: 13,
      color: "#943C29",
      direccion: faArrowDown
    },
    {
      x: 16,
      y: 13,
      color: "#3F3C29",
      direccion: faArrowUp
    }
  ]

  let entrada = entradas.find(e => e.x === x && e.y === y)

  if (entrada) {
    return (
      <div 
        className='casillero' 
        style={{
          backgroundColor: entrada.color,
          position: 'absolute',
          fontSize: '1.5em'
        }}
      >
        <FontAwesomeIcon icon={entrada.direccion} />
      </div>
    )
  } else {
    return null
  }
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
      <div style={{opacity: hovering ? '50%' : '0%', cursor: hovering ? 'pointer': '', position: 'absolute', zIndex: 1}}
      onClick={e => {
          moverFicha({
            id_partida: props.id_partida,
            id_jugador: props.id_jugador,
            x: props.x,
            y: props.y
          }).then(() => props.setPosDisponibles([]));
        }}>
        <Ficha color={miColor(props.jugadores)} />
      </div> : null}
      {esEntradaRecinto(props.x, props.y)}
    </div>
  )
}