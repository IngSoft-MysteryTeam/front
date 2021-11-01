import React from "react-router-dom";

/**
 * Boton para actualizar lista de partidas en el inicio -> ListaPartidas.
 * @param {actPartidas} props Obtiene las partidas desde el back.
 * @returns 
 */
function BotonAct(props) {
    return (
        <div>
            <button
                className="btn btn-dark"
                style={{ width: "100px" }}
                onClick={(e) => props.actpartidas()}
            >
                Actualizar
            </button>
        </div>
    );
}

export default BotonAct;
