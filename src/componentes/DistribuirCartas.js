import Carta from './Carta';

export default function DistribuirCartas(props) {
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            {props.cartas.map((e, index) => 
                <Carta carta={e} key={index} />
            )}
        </div>
    )
}
