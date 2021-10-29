import React, {Fragment, useState} from "react";
import { useHistory } from 'react-router';
import axios from 'axios';


export default function CreaPartida() {

    const history = useHistory();

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
    const enviarPartida = (evento) => {
        evento.preventDefault();
        axios.post('http://localhost:8000/nueva-partida/', 
        {nombre: newpartida.nombre, anfitrion: sessionStorage.getItem("NombreJugador")})
        .then(res =>{
            if (res.status === 200) {
                axios.post(`http://localhost:8000/partida/${res.data.id_partida}/unirse`,{
                nombre: sessionStorage.getItem("NombreJugador")})
                .then(res=>{
                    history.push({pathname: `/partidas/${res.data.id_partida}`, state: {...res.data, nombre: newpartida.nombre}});
                }).catch(err=>{
                    alert("Ocurrió un error. Revise la consola.")
                    console.error(err)
                })
            }
          }).catch(err => {
            alert("Ocurrió un error. Revise la consola.")
            console.error(err)
          })
        }
  
    return (
        <Fragment>   
            <div className = "card card-body" style = {{maxWidth: "700px", margin: "auto"}}>
                    <h2 style={{textAlign:"center", color: 'black'}}>CREAR PARTIDA</h2>
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