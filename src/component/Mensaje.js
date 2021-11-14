export default function Mensaje(props) {
  return (
    <div className='mensaje'><span style={{fontWeight: 'bold', color: props.color}}>{props.nombre}</span>: {props.texto}</div>
  )
}