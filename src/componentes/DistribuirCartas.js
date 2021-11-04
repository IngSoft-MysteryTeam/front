import React from 'react';
import Carta from './Carta';

//import ama_de_llaves from "../imagenes/ama_de_llaves.png";


 export default function DistribuirCartas(props) {
    console.log(props.cartas)
    return(
        <div>
            {props.cartas.map((e, index) => 
                <Carta carta = {e}/>  
            )
                }
        </div>
    )
  
}


