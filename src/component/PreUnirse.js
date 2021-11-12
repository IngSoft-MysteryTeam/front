import { useState } from "react";
import BotonUnirse from "./BotonUnirse";
import SelectorColores from "./SelectorColores";

export default function PreUnirse(props) {
    const [selected, setSelected] = useState(null);

    return (
        <div className="popup">
            <h1>Unirse a {props.partida.nombre}</h1>
            <SelectorColores
                colores={props.partida.colores}
                setColor={props.setColor}
                onSelect={setSelected}
            />
            <div style={{ display: "flex", columnGap: "10px" }}>
                <BotonUnirse
                    partida={props.partida}
                    unirse={props.Unirsepartida}
                    disabled={!props.color}
                />
                <button
                    className="btn btn-dark"
                    onClick={(e) => {
                        props.setColor(null);
                        props.setPrePartida(null);
                    }}
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}
