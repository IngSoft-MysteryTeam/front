export default function MostrarPerdioCarta(props) {
    return (
        <div className="acusacion">
            <h1>{props.nombre} no usó la Bruja de Salem</h1>
            <div
                style={{
                    display: "flex",
                    columnGap: "15px",
                    marginTop: "10px",
                }}
            >
            </div>
            <button
                className="btn btn-dark"
                style={{ marginTop: "15px" }}
                onClick={() => props.setPerdioBruja(null)}
            >
                Aceptar
            </button>
        </div>
    );
}
