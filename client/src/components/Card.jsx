import './Card.css'
import React from "react";

export function Card({name, image, temperament, weight}){
    
    


    return (
        <div className='card-container'>
           <h1 style={{textAlign:'center'}}>{name}</h1>
           <center> <img src={image} width='80%' style={{margin:'auto'}}></img></center>
           <section style={{marginLeft:'30px'}} className='temp-weight'>
           <p>TEMPERAMENT:</p>
            <p>{temperament}</p>
            
            <p>WEIGHT:</p>
            <p> {weight}</p>
            </section>
        </div>
    )
}