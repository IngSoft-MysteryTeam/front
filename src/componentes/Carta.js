import React from 'react';

export default function Carta (props) {

        return (
            <img src={`/cartas/${props.carta}.png`} className="imagenes" alt="imagen" />
        )
}