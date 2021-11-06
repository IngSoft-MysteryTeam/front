import Casillero from "./Casillero"

function esCasillero(x, y) {
  return (x === 6 || x === 13) || (y === 6 || y === 13)
}

const recintos = [
  {
    nombre: "Cochera",
    xInicio: 0,
    yInicio: 0,
    xFin: 7,
    yFin: 7,
    imagen: "cochera"
  },
  {
    nombre: "Alcoba",
    xInicio: 7,
    yInicio: 0,
    xFin: 13,
    yFin: 13,
    imagen: "alcoba"
  },
  {
    nombre: "Biblioteca",
    xInicio: 14,
    yInicio: 0,
    xFin: 19,
    yFin: 13,
    imagen: "biblioteca"
  },
  {
    nombre: "Vestíbulo",
    xInicio: 0,
    yInicio: 7,
    xFin: 7,
    yFin: 13,
    imagen: "vestibulo"
  },
  {
    nombre: "Misterio",
    xInicio: 7,
    yInicio: 7,
    xFin: 13,
    yFin: 13,
    imagen: "logomisterio"
  },
  {
    nombre: "Panteón",
    xInicio: 14,
    yInicio: 7,
    xFin: 19,
    yFin: 13,
    imagen: "panteon"
  },
  {
    nombre: "Bodega",
    xInicio: 0,
    yInicio: 14,
    xFin: 7,
    yFin: 19,
    imagen: "bodega"
  },
  {
    nombre: "Salón",
    xInicio: 7,
    yInicio: 14,
    xFin: 13,
    yFin: 19,
    imagen: "salon"
  },
  {
    nombre: "Laboratorio",
    xInicio: 14,
    yInicio: 14,
    xFin: 19,
    yFin: 19,
    imagen: "laboratorio",
  }
]

export default function Tablero(props) {
  return (
    <div className='tableroDiv'>
      <div className='tablero'>
        {[...Array(20)].map((e, i) => (
          [...Array(20)].map((e, j) => (
            esCasillero(i, j) ?
            <Casillero
              key={j}
              x={i}
              y={j}
              jugadores={props.jugadores}
              posDisponibles={props.posDisponibles}
              id_partida={props.id_partida}
              id_jugador={props.id_jugador}
              setPosDisponibles={props.setPosDisponibles}
            />
            : null
          ))
        ))}
        {recintos.map((e, i) => (
          <div className='recinto' key={i}
            style={{
            gridColumnStart: e.xInicio+1, 
            gridColumnEnd: e.xFin+1, 
            gridRowStart: e.yInicio+1, 
            gridRowEnd: e.yFin+1
          }}
          >
            <img src={`/tablero/${e.imagen}.png`} width='245px' alt={e.nombre}></img>
          </div>
        ))}
      </div>
    </div>
  )
}