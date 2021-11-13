import React from "react";

export default function Acusar(props) {
    return (
        <button
            className={"btn btn-dark"}
            onClick={(e) => props.setAcusando(true)}
        >
            Acusar
        </button>
    );
}
