export default function BotonSospechar(props){
    return (
        <><button
            className="btn btn-dark">
            Sospechar
        </button><table className="tablaPartidas" style={{ marginBottom: "10px" }}>
                <thead>
                    <tr>
                        <th>Victimas</th>
                        <th>Monstruos</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th><img className='carta' src={`/cartas/CONDE.png`} height='100px' alt={props.carta} /></th>
                        <th><img className='carta' src={`/cartas/DRACULA.png`} height='100px' alt={props.carta} /></th>

                    </tr>
                    <tr>
                        <th><img className='carta' src={`/cartas/CONDESA.png`} height='100px' alt={props.carta} /></th>
                        <th><img className='carta' src={`/cartas/FRANKENSTEIN.png`} height='100px' alt={props.carta} /></th>

                    </tr>
                    <tr>
                        <th><img className='carta' src={`/cartas/AMADELLAVES.png`} height='100px' alt={props.carta} /></th>
                        <th><img className='carta' src={`/cartas/HOMBRELOBO.png`} height='100px' alt={props.carta} /></th>

                    </tr>
                    <tr>
                        <th><img className='carta' src={`/cartas/MAYORDOMO.png`} height='100px' alt={props.carta} /></th>
                        <th><img className='carta' src={`/cartas/FANTASMA.png`} height='100px' alt={props.carta} /></th>
                    </tr>
                    <tr>
                        <th><img className='carta' src={`/cartas/DONCELLA.png`} height='100px' alt={props.carta} /></th>
                        <th><img className='carta' src={`/cartas/MOMIA.png`} height='100px' alt={props.carta} /></th>
                    </tr>
                    <tr>
                        <th><img className='carta' src={`/cartas/JARDINERO.png`} height='100px' alt={props.carta} /></th>
                        <th><img className='carta' src={`/cartas/JEKYLLHYDE.png`} height='100px' alt={props.carta} /></th>
                    </tr>
                </tbody>
            </table></>
            
    )
}