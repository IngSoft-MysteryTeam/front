export default function MostrarCartaMisterio(props) {
    return (
        <div className="popup">
            <h1>{props.jugosalem} uso la bruja de Salem</h1>
            <div
                style={{
                    display: "flex",
                    columnGap: "15px",
                    marginTop: "10px",
                }}
            >
                {props.cartamisterio ? (
                    <img
                        src={`/cartas/${props.cartamisterio}.png`}
                        height="200px"
                        alt={props.cartamisterio}
                        style={{ marginBottom: "10px" }}
                    />
                ) : null}
            </div>
            <button
                className="btn btn-dark"
                style={{ marginTop: "15px" }}
                onClick={() => props.setSalem(null)}
            >
                Aceptar
            </button>
        </div>
    );
}
