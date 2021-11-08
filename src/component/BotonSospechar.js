import React from "react";

export default function Sospechar(props) {
    return (
        <button
            className={"btn btn-dark"}
            onClick={(e) => props.sospechando(true)}
        >
            Sospechar
        </button>
    );
}
