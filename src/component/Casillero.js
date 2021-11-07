import { useState } from 'react'
import Ficha from './Ficha'
import { obtNombrejugador, moverFicha } from "../services"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowLeft, faArrowRight, faArrowUp } from '@fortawesome/free-solid-svg-icons'
/**
 * Calcula las entradas de inicio del tablero
 * @param  {int} x Posicion del tablero
 * @param  {int} y Posicion del tablero
 */
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
/**
 * Busca las posiciones donde estan los jugadores
 * @param  {Array} jugadores
 * @param  {int} x
 * @param  {int} y
 */
function buscarJugadores(jugadores, x, y) {
  let res = Array.from(jugadores)

  res = res.filter(jugador => jugador.posX === x && jugador.posY === y && jugador.recinto === "")

  return res;
}
/**
 * Calcula si la posiciones son posibles acceder con la ficha del jugador 
 * @param  {Array} posPosibles Posiciones que envia el back
 * @param  {int} x Posicion del tablero
 * @param  {int} y Posicion del tablero
 */
function esPosicionPosible(posPosibles, x, y) {
  if (posPosibles.findIndex(e => e.x === x && e.y === y) !== -1) {
    return true;
  }
  return false;
}
/**
 * Obtiene el color de un jugador
 * @param  {object} jugadores, Lista de jugadores
 */
function miColor(jugadores) {
  return jugadores.find(e => e.nombre === obtNombrejugador()).color
}
/**
 * Calcula las entradas a los recintos
 * @param  {int} x Posicion del tablero
 * @param  {int} y Posicion del tablero
 */
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

/**
 * Calcula el tamaño adecuado de la ficha en base a la cantidad de jugadores
 * que hay en el casillero.
 * @param {*} jugadores 
 * @param {*} x 
 * @param {*} y 
 * @returns {string}
 */
function getTamañoFicha(jugadores, x, y) {
  let arreglo = buscarJugadores(jugadores, x, y);
  if (arreglo.length > 1) {
    return '18px';
  } else {
    return '30px';
  }
}

/**
 * Renderiza las fichas y las posibles elecciones de casillas para moverse.
 * @param  {object} props Id partida y jugador. Posiciones en el tablero
 */
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
        <Ficha key={i} color={e.color} tamaño={getTamañoFicha(props.jugadores, props.x, props.y)} />
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
        <Ficha color={miColor(props.jugadores)} tamaño='30px' />
      </div> : null}
      {esEntradaRecinto(props.x, props.y)}
    </div>
  )
}