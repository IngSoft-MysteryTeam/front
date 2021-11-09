import React from "react";
/**
 * Renderiza el botón que te permite realizar una sospecha
 * @param  {object} props Estado de sospecha
 */
export default function Sospechar(props) {
    return (
        <button
            className={"btn btn-dark"}
            onClick={(e) => props.sospechando(!props.eligosospechar)}
        >
            {props.eligosospechar ? "Cancelar sospecha" : "Sospechar"}
        </button>
    );
}
