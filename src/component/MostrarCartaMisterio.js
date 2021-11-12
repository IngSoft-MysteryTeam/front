export default function MostrarCartaMisterio(props) {
    return (
        <div className="acusacion">
            <h1>{props.jugosalem.nombre} uso la bruja de Salem</h1>
            <div
                style={{
                    display: "flex",
                    columnGap: "15px",
                    marginTop: "10px",
                }}
            >
            <img
                src={`/cartas/${props.cartamisterio}.png`}
                height="200px"
                alt={props.cartamisterio}
                style={{ marginBottom: "10px" }}
            />
            </div>
            <button
                className="btn btn-dark"
                style={{ marginTop: "15px" }}
                onClick={() => props.setcartamisterio(null)}
            >
                Aceptar
            </button>
        </div>
    );
}
