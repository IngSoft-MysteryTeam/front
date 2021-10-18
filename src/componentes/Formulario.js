import React from "react";

function Formulario () {
    return (
        <form className = "row">
            <h1>Creando Nueva Paritda</h1>
            <div className = "col-md-3">      
                <input 
                type="text" 
                placeholder = "Escribe un Nombre"
                /* nombre = "nombre"
                onChange = {Partida(nombre)} *//>
                 <br/>
                 <br/>
                <button 
                className = "btn btn-dark" 
                type = "submit">
                Crear
                </button>
                <br/>
            </div>
        </form>
    );
}

export default Formulario;
