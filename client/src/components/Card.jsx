import './Card.css'
import React from "react";

export function Card({name, image, temperament, weight}){
    
    


    return (
        <div>
           <h1>{name}</h1>
            <img src={image} width='60%'></img>
            <div>TEMPERAMENT: <br/>{temperament}</div>
            <div>WEIGHT: {weight}</div>
        </div>
    )
}