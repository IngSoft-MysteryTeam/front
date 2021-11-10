/**
 * Renderiza las cartas de una acusacion
 * @param  {object} props Nombre de jugador y cartas de acusacion
 */
 export default function MostrarAcusacion(props) {
    return (
        <div className="acusacion">
            <h1>{props.acusar.nombre} acusó</h1>
            <div
                style={{
                    display: "flex",
                    columnGap: "15px",
                    marginTop: "10px",
                }}
            >
                {props.acusar.cartas.map((e, key) => (
                    <img src={`/cartas/${e}.png`} height="200px" key={key} />
                ))}
            </div>
            <button className="btn btn-dark" style={{marginTop: "15px"}} onClick={()=> props.setacusar(null)}>
                Aceptar
            </button>
        </div>
    );
}