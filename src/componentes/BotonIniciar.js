import React from "react";

export default function Iniciar (props){
    return(
        <button 
        className="btn btn-dark"
        disabled={props.cantjugadores < 2}
        >
            Iniciar
        </button>
    );
}