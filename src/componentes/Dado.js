export default function Dado(props) {
    return (
        <h3 className="resultadoDado" style={{ marginTop: "10px" }}>
            {props.numero}
        </h3>
    );
}
