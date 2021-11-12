import { useState } from "react";

export default function SelectorColores(props) {
    const [hover, setHover] = useState(-1);
    const [selected, setSelected] = useState(null);

    return (
        <>
            <h3>Elige un color:</h3>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    columnGap: "15px",
                }}
            >
                {props.colores.map((e, i) => (
                    <div
                        onMouseOver={(e) => setHover(i)}
                        onMouseOut={(e) => setHover(-1)}
                        onClick={() => {
                            setSelected(e);
                            props.setColor(e);
                        }}
                        style={{
                            height: "40px",
                            width: "40px",
                            borderRadius: "20px",
                            border: "2px solid white",
                            backgroundColor: e,
                            opacity:
                                hover === i || selected === e ? "100%" : "50%",
                            cursor: "pointer",
                        }}
                    />
                ))}
            </div>
        </>
    );
}
