import react from 'react';
import './LanzarDado.css';


export default function LarzarDado () {
    let min = 1;
    let max = 6;
    let result = Math.floor(Math.random() * (max - min + 1)) + min

    return (
        <div style={{maxWidth: '500px', margin: 'auto'}}>
            <button className = "btnDado" onClick={numeroAletorio()}>
            Lanzar dado
            </button>
            <h3 className="resultadoDado">
               {numeroAletorio(1,6)}
               
            </h3>

        </div>
    );
}

function numeroAletorio() {
    var myMin = 1;
    var myMax = 6;
    var result
    
    result = Math.floor(Math.random() * (myMax - myMin + 1)) + myMin
    
    return result;
}