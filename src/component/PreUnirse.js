import BotonUnirse from "./BotonUnirse";
import SelectorColores from "./SelectorColores";
/**
 * Renderiza la opcion de elegir color antes de unirse.
 * @param  {props} props
 */
export default function PreUnirse(props) {
    return (
        <div className="popup">
            <h1>Unirse a {props.partida.nombre}</h1>
            <SelectorColores
                colores={props.partida.colores}
                setColor={props.setColor}
            />
            {props.partida.password ? (
                <input
                    type="password"
                    placeholder="Contraseña"
                    onChange={(e) => props.setPassword(e.target.value)}
                />
            ) : null}
            <div style={{ display: "flex", columnGap: "10px" }}>
                <BotonUnirse
                    partida={props.partida}
                    unirse={props.Unirsepartida}
                    disabled={!props.color || (props.partida.password && !props.password)}
                />
                <button
                    className="btn btn-dark"
                    onClick={(e) => {
                        props.setColor(null);
                        props.setPassword("");
                        props.setPrePartida(null);
                    }}
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}