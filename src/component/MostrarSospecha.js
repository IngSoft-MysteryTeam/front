/**
 * Renderiza las cartas de una sospecha
 * @param  {object} props Nombre de jugador y cartas de sospecha
 */
export default function MostrarSospecha(props) {
    return(
        <div className='sospecha'>
            <h1>{props.sospecha.nombre} sospechó</h1>
            <div style={{display: 'flex', columnGap: '15px', marginTop: '10px'}}>
                {props.sospecha.cartas.map(( e, key )=>(<img src={`/cartas/${e}.png`} height='200px' key={key}/>))}
            </div>
        </div>
    );
}
