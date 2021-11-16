import { useHistory } from "react-router";

export default function Sumario({ sumario }) {
    const history = useHistory();

    return (
        <div className="popup">
            {Object.keys(sumario.ganador).length > 0 ? (
                <>
                    <h1>{sumario.ganador.nombre} ha ganado la partida</h1>
                    <div style={{ display: "flex", columnGap: "10px" }}>
                        {sumario.ganador.cartas.map((e, i) => (
                            <img
                                src={`/cartas/${e}.png`}
                                height="200px"
                                key={i}
                                alt={e}
                            />
                        ))}
                    </div>
                    <h3>Además, hizo {sumario.ganador.sospechas} sospechas</h3>
                </>
            ) : (
                <>
                    <h1>Nadie ganó la partida</h1>
                </>
            )}
            {sumario.perdedores.map((e, i) => (
                <>
                    <h3>
                        {e.nombre} acusó: {e.cartas.map((e, i) => e + " ")}-
                        hizo {e.sospechas} sospechas
                    </h3>
                </>
            ))}
            <h3>Se realizaron {sumario.total_sospechas} sospechas en total</h3>
            <h3>La partida duró {sumario.tiempo}</h3>
            <button
                className="btn btn-dark"
                onClick={(e) => history.push("/inicio")}
            >
                Volver al inicio
            </button>
        </div>
    );
}