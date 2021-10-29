import React, { Fragment, useState, useEffect } from "react";
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

    const enviarJugador = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/', {nombre: newjugador.nombre}).then((res) => {
            if (res.status === 200) {
                history.push('/inicio')
                sessionStorage.setItem("NombreJugador", newjugador.nombre)
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

    useEffect(()=>{
        if(localStorage.getItem("NombreJugador")){
            history.push('/inicio')
        }
    })

    return (
        <Fragment>
            <header id="header">
            <h1 style={{marginTop: '10px', textAlign:"center", color:"yellow"}}>MISTERIO </h1>           
            </header>  

            <div className="card text-white bg-dark mb-3" style = {{maxWidth: "500px", margin: "auto"}}>
                <h2 style={{textAlign:"center", color:"red"}}> Ingresar </h2>
                <form onSubmit = {enviarJugador}>
                    <input 
                    placeholder = "Introduce nombre de jugador"
                    className = "form-control"
                    type="text"
                    name = "nombre"
                    onChange = {controlEvents}
                    maxLength ="20"
                    required
                    />
                    <div>
                    <button className = "btn btn-dark" type="submit">Ingresar</button>
                    </div>
                </form>
            </div>
        </Fragment>
    );

}