import React, {useState} from 'react';

/**
 * Componente que renderiza un informe
 * 
 */
 export default function Informe() {
    const [inf1, setInf1] = useState("");
    const [inf2, setInf2] = useState("");
    const [inf3, setInf3] = useState("");
    const [inf4, setInf4] = useState("");
    const [inf5, setInf5] = useState("");
    const [inf6, setInf6] = useState("");
    const [inf7, setInf7] = useState("");
    const [inf8, setInf8] = useState("");
    const [inf9, setInf9] = useState("");
    const [inf10, setInf10] = useState("");
    const [inf11, setInf11] = useState("");
    const [inf12, setInf12] = useState("");
    const [inf13, setInf13] = useState("");
    const [inf14, setInf14] = useState("");
    const [inf15, setInf15] = useState("");
    const [inf16, setInf16] = useState("");
    const [inf17, setInf17] = useState("");
    const [inf18, setInf18] = useState("");
    const [inf19, setInf19] = useState("");
    const [inf20, setInf20] = useState("");

    
    return (
        <div className="informe">
            <h1> INFORME </h1> 
           <table>
               <th>MONSTRUO</th>
               <tr>DRACULA
                   <td><button 
                            className="square"
                            onClick={() => setInf1('X')}
                        >
                            {inf1}
                        </button>
                        <input>
                        
                        </input>
                   </td>
               </tr>
               <tr>FRANKENSTEIN
                    <td><button 
                            className="square"
                            onClick={() => setInf2('X')}
                        >
                            {inf2}
                        </button>
                        <input>
                        
                        </input>
                   </td>
               </tr>
               <tr>HOMBRE LOBO
                   <td><button 
                            className="square"
                            onClick={() => setInf3('X')}
                        >
                            {inf3}
                        </button>
                        <input>
                        
                        </input>
                   </td>
               </tr>
               <tr>FANTASMA
                    <td><button 
                            className="square"
                            onClick={() => setInf4('X')}
                        >
                            {inf4}
                        </button>
                        <input>
                        
                        </input>
                   </td>
               </tr>
               <tr>MOMIA
                   <td><button 
                            className="square"
                            onClick={() => setInf5('X')}
                        >
                            {inf5}
                        </button>
                        <input>
                        
                        </input>
                   </td>
               </tr>
               <tr>DR. JEKYLL MR.HYDE
                    <td><button 
                            className="square"
                            onClick={() => setInf6('X')}
                        >
                            {inf6}
                        </button>
                        <input>
                        
                        </input>
                   </td>
               </tr>

               <th>VÍCTIMA</th>
               <tr>CONDE
                   <td><button 
                            className="square"
                            onClick={() => setInf7('X')}
                        >
                            {inf7}
                        </button>
                        <input>
                        
                        </input>
                   </td>
               </tr>
               <tr>CONDESA
                    <td><button 
                            className="square"
                            onClick={() => setInf8('X')}
                        >
                            {inf8}
                        </button>
                        <input>
                        
                        </input>
                   </td>
               </tr>
               <tr>AMA DE LLAVES
                   <td><button 
                            className="square"
                            onClick={() => setInf9('X')}
                        >
                            {inf9}
                        </button>
                        <input>
                        
                        </input>
                   </td>
               </tr>
               <tr>MAYORDOMO
                    <td><button 
                            className="square"
                            onClick={() => setInf10('X')}
                        >
                            {inf10}
                        </button>
                        <input>
                        
                        </input>
                   </td>
               </tr>
               <tr>DONCELLA
                   <td><button 
                            className="square"
                            onClick={() => setInf11('X')}
                        >
                            {inf11}
                        </button>
                        <input>
                        
                        </input>
                   </td>
               </tr>
               <tr>JARDINERO
                    <td><button 
                            className="square"
                            onClick={() => setInf12('X')}
                        >
                            {inf12}
                        </button>
                        <input>
                        
                        </input>
                   </td>
               </tr>
               <th>RECINTO</th>
               <tr>VESTÍBULO
                   <td><button 
                            className="square"
                            onClick={() => setInf13('X')}
                        >
                            {inf13}
                        </button>
                        <input>
                        
                        </input>
                   </td>
               </tr>
               <tr>ALCOBA
                    <td><button 
                            className="square"
                            onClick={() => setInf14('X')}
                        >
                            {inf14}
                        </button>
                        <input>
                        
                        </input>
                   </td>
               </tr>
               <tr>BIBLIOTECA
                   <td><button 
                            className="square"
                            onClick={() => setInf15('X')}
                        >
                            {inf15}
                        </button>
                        <input>
                        
                        </input>
                   </td>
               </tr>
               <tr>SALÓN
                    <td><button 
                            className="square"
                            onClick={() => setInf16('X')}
                        >
                            {inf16}
                        </button>
                        <input>
                        
                        </input>
                   </td>
               </tr>
               <tr>LABORATORIO
                   <td><button 
                            className="square"
                            onClick={() => setInf17('X')}
                        >
                            {inf17}
                        </button>
                        <input>
                        
                        </input>
                   </td>
               </tr>
               <tr>BODEGA
                    <td><button 
                            className="square"
                            onClick={() => setInf18('X')}
                        >
                            {inf18}
                        </button>
                        <input>
                        
                        </input>
                   </td>
               </tr>
               <tr>PANTEON
                    <td><button 
                            className="square"
                            onClick={() => setInf19('X')}
                        >
                            {inf19}
                        </button>
                        <input>
                        
                        </input>
                   </td>
               </tr>
               <tr>COCHERA
                    <td><button 
                            className="square"
                            onClick={() => setInf20('X')}
                        >
                            {inf20}
                        </button>
                        <input>
                        
                        </input>
                   </td>
               </tr>
           </table>
        </div>
    );
}
