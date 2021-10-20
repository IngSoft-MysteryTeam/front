import React from 'react';

class Formulario extends React.Component{

    handleSubmit = (e) => {
        
        e.preventDefault()
        const partida = this.inputName.value
        console.log({partida})
    }

    render(){
        return(
            <div className = "col-md-3">
                <h1>Nueva Partida</h1>
                <form className = "row"
                    onSubmit={this.handleSubmit}>
                    <p>
                        <label htmlFor='partida'>Introducir nombre:</label>   
                        <input 
                            id='partida'
                            name='nombrePartida'
                            type='text' 
                            placeholder = 'Escribe un Nombre'
                            ref={inputElement => this.inputName = inputElement}
                            required  />
                    </p>        
                        <button
                        className = "btn btn-dark" 
                        type = "submit">    
                        Crear
                        </button>
                        <br/>
                </form>
            </div>    
        )
    }
}

export default Formulario;
