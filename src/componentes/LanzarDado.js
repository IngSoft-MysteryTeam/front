import { useState } from 'react';
import './LanzarDado.css';


export default function LarzarDado () {
    const [dado, setDado] = useState(-1);

    function numeroAletorio() {
        var myMin = 1;
        var myMax = 6;
        var result
        
        result = Math.floor(Math.random() * (myMax - myMin + 1)) + myMin
    
        setDado(result);
    }

    return (
        <div style={{maxWidth: '500px', margin: 'auto'}}>
            <button className = "btnDado" onClick={e => numeroAletorio(1,6)}>
            Lanzar dado
            </button>

            {dado !== -1 ? 
            <h3 className="resultadoDado">
               {dado}  
            </h3> : null}

        </div>
    );
}