import React, {Fragment, useState} from "react";
import axios from 'axios';


export default function CreaPartida() {

    const [newpartida, setNombre] = useState({
        nombre: ''
    })

    const controlEvents =  (evento) => {
        console.log(evento.target.value)
        setNombre({
            ...newpartida,
            [evento.target.name]: evento.target.value
        })
    }
    const enviarPartida = async (evento) => {
        evento.preventDefault();
        const resp = await axios.post('http://localhost:8000/nueva-partida/', 
        {nombre: newpartida.nombre})
        console.log(resp)   
    }
  
    return (
        <Fragment>   
            <div className = "card card-body" style = {{maxWidth: "700px", margin: "auto"}}>
                    <h2 style={{textAlign:"center"}}> PARTIDA </h2>
                    <br/>
                    <form className = "row" onSubmit = {enviarPartida}>
                        <input 
                        placeholder = "Escribe un Nombre"
                        className = "form-control"
                        type="text"
                        name = "nombre"
                        onChange = {controlEvents}
                        required
                        />
                        <button 
                        className = "btn btn-dark" type = "submit">
                            Crear
                        </button>
                    </form>
            </div>
        </Fragment>
    );
}