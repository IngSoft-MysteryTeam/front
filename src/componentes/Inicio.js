import React, {Fragment} from "react";

export default function Inicio () {
    return(
        <div className="contenedor">
            <div className= "contenedorMedio">
                <h1 style={{color:"red"}}>Ingresar Usuario</h1>
                <div className="contenedorChico">
                    <form className ="camposGrandes">
                        <table width="400px" border="0" margin="auto">
                            <tbody>
                                <tr>
                                    <td>
                                        <span className="literal_a">Nombre:</span>
                                    </td>
                                    <td>
                                        <input type="text" maxLength="20" title="Nombre Jugador" size ="30" required/>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <input type="submit" className="btn btn-light" value="Ingresar"/> 
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    )
}