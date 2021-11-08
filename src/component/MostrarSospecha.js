/**
 * Renderiza las cartas de una sospecha
 * @param  {object} props Nombre de jugador y cartas de sospecha
 */
export default function MostrarSospecha(props) {
    return (
        <div
            style={{
                position: "absolute",
                backgroundColor: "gray",
                padding: "20px",
                zIndex: "3",
                top: "305px",
                right: "610px",
            }}
        >
            <h1>{props.sospecha.nombre} Sospechó</h1>
            {props.sospecha.cartas.map((e, index) => (
                <img src={`/cartas/${e}.png`} height="200px" />
            ))}
        </div>
    );
}
