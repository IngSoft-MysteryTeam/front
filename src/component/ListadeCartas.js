import React, {Fragment, useState} from 'react'
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from 'reactstrap';
/**
 * Lista de cartas para poder sospechar o acusar
 */
export default function ListadeCartas() {
    const [dropdown1, setDropdown1] = useState(false);
    const [dropdown2, setDropdown2] = useState(false);
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
                <DropdownItem> CONDE  </DropdownItem>
                <DropdownItem> CONDESA  </DropdownItem>
                <DropdownItem> AMADELLAVES  </DropdownItem>
                <DropdownItem> MAYORDOMO  </DropdownItem>
                <DropdownItem> DONCELLA  </DropdownItem>
                <DropdownItem> JARDINERO  </DropdownItem>
            </DropdownMenu>
        </Dropdown>
            <Dropdown isOpen={dropdown2} toggle={abricerrarDropdown2}>
            <DropdownToggle caret>
                Monstruos
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem> DRACULA </DropdownItem>
                <DropdownItem> FRANKENSTEIN </DropdownItem>
                <DropdownItem> HOMBRELOBO </DropdownItem>
                <DropdownItem> FANTASMA </DropdownItem>
                <DropdownItem> MOMIA </DropdownItem>
                <DropdownItem> JEKYLLHYDE </DropdownItem>
            </DropdownMenu>
            </Dropdown>
        </Fragment>
    )
}