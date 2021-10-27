import React, { useState, useEffect } from 'react';
import BotonCrear from './BotonCrear';
import BotonUnirse from './BotonUnirse';
import BotonAct from './BotonAct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'

export default function ListaPartidas() {
  
  const [partidas, setPartidas] = useState([]);

  
  function TraerPartidas() {
    axios.get('http://localhost:8000/partidas/')
    .then(res =>{
        console.log(res)
        setPartidas(res.data)
      }).catch((err)=>{
        alert("No hay partidas. ¡Crea una nueva!")
        console.log(err)
      })
    }
    
    useEffect(()=>{
     TraerPartidas(); 
    },[])

  return (
    <div style={{maxWidth: '750px', margin: 'auto'}}>
      <h1 style={{color:"white"}}>Unirse a una partida</h1>
      <table className='tablaPartidas' style={{marginBottom: '10px'}}>
        <thead>
          <tr>
            <th width='50%'>Partida</th>
            <th>Anfitrión</th>
            <th width='140px'>Cant. Jugadores</th>
          </tr>
        </thead>
        <tbody>
          {partidas.map((e, key) => (
            <tr key={key}>
              <td>{e.nombre}</td>
              <td>{e.id_partida}</td>
              <td><FontAwesomeIcon icon={faUserFriends} /> 1/6</td>
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
      <BotonAct actpartidas = {TraerPartidas}/>
      <br/>
      <BotonCrear />
    </div>
  )
}