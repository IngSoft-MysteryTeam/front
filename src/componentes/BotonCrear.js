import React, {Link} from "react-router-dom";

function BotonCrear () {
    return (
        <div>
            <Link to = "/partidas" className = "btn btn-dark">
            Crear Partida
            </Link>
        </div>
    );
}

export default BotonCrear;
