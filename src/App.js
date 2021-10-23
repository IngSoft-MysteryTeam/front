import React from 'react';
/*Importando componentes*/
import Approuter from './routers/AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';


function App () {
  return (
      <div style={{marginTop: '10px'}}>
        <br />
          <Approuter/>
      </div>
  );
}

export default App;

