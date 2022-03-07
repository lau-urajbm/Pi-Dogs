import './Paginado.css'
import React from "react";

export default function Paginado({ nDogsPag, dogs, paginado}){
    const paginas=[]

    for(var i = 1; i<= Math.ceil(dogs/nDogsPag); i++){
        paginas.push(i)
    }
    return(
        <nav>
            <ul className='lista'>
                {paginas && paginas.map(pagina=>{
                    return <li  key={pagina}><button className='boton' onClick={()=>paginado(pagina)}>{pagina}</button></li>
                })}
            </ul>
        </nav>
    )
}