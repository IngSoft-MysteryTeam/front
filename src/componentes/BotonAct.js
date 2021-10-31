import React from "react-router-dom";

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
