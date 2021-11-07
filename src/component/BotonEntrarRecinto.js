import { entrarRecinto } from "../services";

/**
 * Boton para ingresar a un recinto
 * @param {object} props 
 * @returns evento click
 */
export default function EntrarRecinto(props) {
  return (
    <button className='btn btn-dark' onClick={e => entrarRecinto({id_partida: props.id_partida, id_jugador: props.id_jugador})}>
      Entrar al recinto
    </button>
  )
}