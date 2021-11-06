import React, {Fragment, useState} from 'react'
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import { hacerSospecha } from '../services';
import Carta from './Carta';
/**
 * Lista de cartas para 
 */
export default function ListadeCartas(props) {
    const [dropdown1, setDropdown1] = useState(false);
    const [dropdown2, setDropdown2] = useState(false);
    const [victima, setVictima] = useState("")
    const [monstruo, setMonstruo] = useState("")
    const abricerrarDropdown1=()=>{
        setDropdown1(!dropdown1)
    }
    const abricerrarDropdown2=()=>{
        setDropdown2(!dropdown2)
    }

    return(
        <Fragment>
        <Dropdown isOpen={dropdown1} toggle={abricerrarDropdown1}>
            <DropdownToggle caret>
                Victimas
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={e=>setVictima("CONDE")}> CONDE  </DropdownItem>
                <DropdownItem onClick={e=>setVictima("CONDESA")}> CONDESA  </DropdownItem>
                <DropdownItem onClick={e=>setVictima("AMADELLAVES")}> AMA DE LLAVES  </DropdownItem>
                <DropdownItem onClick={e=>setVictima("MAYORDOMO")}> MAYOR DOMO  </DropdownItem>
                <DropdownItem onClick={e=>setVictima("DONCELLA")}> DONCELLA  </DropdownItem>
                <DropdownItem onClick={e=>setVictima("JARDINERO")}> JARDINERO  </DropdownItem>
            </DropdownMenu>
        </Dropdown>
            <Dropdown isOpen={dropdown2} toggle={abricerrarDropdown2}>
            <DropdownToggle caret>
                Monstruos
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={e=>setMonstruo("DRACULA")}> DRACULA </DropdownItem>
                <DropdownItem onClick={e=>setMonstruo("FRANKENSTEIN")}> FRANKENSTEIN </DropdownItem>
                <DropdownItem onClick={e=>setMonstruo("HOMBRELOBO")}> HOMBRE LOBO </DropdownItem>
                <DropdownItem onClick={e=>setMonstruo("FANTASMA")}> FANTASMA </DropdownItem>
                <DropdownItem onClick={e=>setMonstruo("MOMIA")}> MOMIA </DropdownItem>
                <DropdownItem onClick={e=>setMonstruo("JEKYLLHYDE")}> Dr.JEKYL y Mr.LHYDE </DropdownItem>
            </DropdownMenu>
            </Dropdown>
            <div style={{display: "flex"}}>
                <img src={`/cartas/${victima}.png`} height='200px'/>
                <img src={`/cartas/${monstruo}.png`} height='200px'/>
            </div>
            <div>
                {
                victima !== "" && 
                monstruo !== "" ? 
                <button 
                className={"btn btn-dark"} 
                onClick={e=>hacerSospecha({
                    victima: victima, 
                    monstruo: monstruo, 
                    id_jugador: props.id_jugador, 
                    id_partida: props.id_partida
                    })}
                >
                    Enviar Sospecha
                </button> : null
                }
            </div>
        </Fragment>
    )
}