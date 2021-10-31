export default function LarzarDado (props) {
    function numeroAletorio() {
        var myMin = 1;
        var myMax = 6;
        var result
        
        result = Math.floor(Math.random() * (myMax - myMin + 1)) + myMin
    
        props.setDado(result);
    }

    return (
        <button className = "btn btn-dark" onClick={e => numeroAletorio(1,6)}>
        Lanzar dado
        </button>
    );
}