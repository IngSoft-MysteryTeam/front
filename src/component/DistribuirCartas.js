import Carta from './Carta';
/**
 * Reparte las cartas a los jugadores
 * @param  {object} props Cartas obtenidas del back
 */
export default function DistribuirCartas(props) {
    return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
            {props.cartas.map((e, index) => 
                <Carta carta={e} key={index} />
            )}
        </div>
    )
}
