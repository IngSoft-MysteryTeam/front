import React, {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function CrearPartida () {
    return (
        <div>
            <Link to = "/partidas" className = "btn btn-dark">
            Crear Partida
            </Link>
        </div>
    );
}

export default CrearPartida;
