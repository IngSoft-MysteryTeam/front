import React, { Link } from "react-router-dom";
/**
 * Boton que te redirige a la componente que crea una partida
 * @returns evento click link to path
 */
function BotonCrear() {
    return (
        <div>
            <Link to="/crear-partida" className="btn btn-dark">
                Crear Partida
            </Link>
        </div>
    );
}

export default BotonCrear;
