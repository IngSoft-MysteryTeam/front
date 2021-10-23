import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CrearPartida from '../componentes/CrearPartida'
import ListaPartidas from '../componentes/ListaPartidas'
import Lobby from '../componentes/Lobby'

export default function Approuter() {
    return (
        <Router>
                <Switch>
                    <Route path = "/partidas/:id">
                        <Lobby/>
                    </Route>
                    <Route path = "/partidas">
                        <CrearPartida/>
                    </Route>
                    <Route path = "/">
                        <ListaPartidas/>
                    </Route>
                    <Route path = "/*">
                        <h1> 404 Not Found </h1>
                    </Route>
                </Switch>
        </Router>
    )
}
