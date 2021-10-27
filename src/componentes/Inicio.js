import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';

export default function Inicio () {
    const history = useHistory()
    
    const [newjugador, setNombre] = useState({
        nombre: ''
    })

    const controlEvents =  (evento) => {
        console.log(evento.target.value)
        setNombre({
            ...newjugador,
            [evento.target.name]: evento.target.value
        })
    }

    const enviarJugador = () => {
        axios.post('http://localhost:8000/', {nombre: newjugador.nombre}).then((res) => {
            if (res.status === 200) {
                history.push('/inicio')
            } else {
                alert("Error desconocido. Revise la consola.")
                console.log(res)
            }
        }).catch((err) => {
            if (err.response && err.response.status === 404) {
                alert("Ya existe un jugador con ese nombre. Por favor elija otro.")
            } else {
                alert("Error desconocido. Revise la consola.")
                console.error(err)
            }
        })
    }

    return (
        <Fragment>
            <header id="header">
            <h1 style={{marginTop: '10px', textAlign:"center"}}>MISTERIO </h1>           
            </header>  

            <div className = "card card-body" style = {{maxWidth: "700px", margin: "auto"}}>
                <h2 style={{textAlign:"center", color:"red"}}> Ingresar </h2>
                <br/>
                <input 
                placeholder = "Introduce nombre de jugador"
                className = "form-control"
                type="text"
                name = "nombre"
                onChange = {controlEvents}
                required
                />
                <div>
                <button className = "btn btn-dark" onClick={e => enviarJugador(newjugador)}>Ingresar</button>
                </div>
            </div>
        </Fragment>
    );

}