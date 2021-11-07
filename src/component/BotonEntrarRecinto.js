import { entrarRecinto } from "../services";

export default function EntrarRecinto(props) {
  return (
    <button className='btn btn-dark' onClick={e => entrarRecinto({id_partida: props.id_partida, id_jugador: props.id_jugador})}>
      Entrar al recinto
    </button>
  )
}