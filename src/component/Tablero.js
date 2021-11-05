import Ficha from "./Ficha"

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
    imagen: "alcoba",
    color: "#943C29"
  },
  {
    nombre: "Biblioteca",
    xInicio: 14,
    yInicio: 0,
    xFin: 19,
    yFin: 13,
    imagen: "biblioteca",
    color: "#453725"
  },
  {
    nombre: "Vestíbulo",
    xInicio: 0,
    yInicio: 7,
    xFin: 7,
    yFin: 13,
    imagen: "vestibulo",
    color: "#511B11"
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
    imagen: "panteon",
    color: "#3F3C29"
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

function buscarJugadores(jugadores, x, y) {
  let res = Array.from(jugadores)

  res = res.filter(jugador => jugador.posX === x && jugador.posY === y)

  console.log(res);

  return res;
}

export default function Tablero(props) {
  return (
    <div className='tableroDiv'>
      <div className='tablero'>
        {[...Array(20)].map((e, i) => (
          [...Array(20)].map((e, j) => (
            esCasillero(i, j) ?
            <div 
              className={`casillero${esEntrada(i,j) ? " entrada" : ""}`}
              style={{
                gridColumnStart: i+1,
                gridRowStart: j+1,
              }}
            >
              {buscarJugadores(props.jugadores, i, j).map(e => (
                <Ficha color={e.color} />
              ))}
            </div> :
            null
          ))
        ))}
        {recintos.map((e) => (
          <div className='recinto' style={{
            gridColumnStart: e.xInicio+1, 
            gridColumnEnd: e.xFin+1, 
            gridRowStart: e.yInicio+1, 
            gridRowEnd: e.yFin+1,
            backgroundColor: e.color
          }}
          >
            <img src={`/tablero/${e.imagen}.png`} width='200px'></img>
          </div>
        ))}
      </div>
    </div>
  )
}