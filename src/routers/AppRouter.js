import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Formulario from '../componentes/Formulario'
import CrearPartida from '../componentes/Crearpartida'

export default function Approuter() {
    return (
        <Router>
            <Switch>
                <Route path = "/partidas">
                    <Formulario/>
                </Route>
                <Route path = "/">
                    <CrearPartida />
                </Route>
                <Route path = "/*">
                    <h1> 404 Not Found </h1>
                </Route>
            </Switch>
        </Router>
    )
}
