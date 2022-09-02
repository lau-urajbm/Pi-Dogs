import './Detalle.css'
import React from "react";
import { Link, useParams} from 'react-router-dom';
import { getDetalleRaza, limpiarDetalle} from '../actions';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from './NavBar';


export default function Detalle(){
    const{id}= useParams()
    
    const dogDetail =useSelector(state=>state.detail)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getDetalleRaza(id))
        dispatch(limpiarDetalle())
    },[id])
    console.log(dogDetail)

    
    

    return(
        <div style={{backgroundImage: `url(https://as1.ftcdn.net/v2/jpg/04/52/52/36/1000_F_452523638_dEyWoXxaSyaVAetlpAnKd3lItFnASsGo.jpg)`, height:'100vh', backgroundRepeat:'repeat-y', backgroundSize:'cover' }}> 
            <NavBar/>
            {/* <Link to='/home'>
            <button className='home'>home</button>
            </Link> */}

            {
                dogDetail.length >0 ? 
                <div>
                     <h1 className='titulo'>{dogDetail[0].name} </h1>
                    <center> <img src={dogDetail[0].image} width='45%' className='perro'/></center>
                     <div className="detalles">
                     <div>TEMPERAMENT: <br/>{dogDetail[0].temperament}</div>
                     <div>WEIGHT: {dogDetail[0].weight === "no especificado"?dogDetail[0].weight_min :dogDetail[0].weight  /* _min+' - '+dogDetail[0].weight_max */}</div>
                     <div>HEIGHT: {dogDetail[0].height&&dogDetail[0].height+' cm'/* _min+' - '+dogDetail[0].height_max */} </div>
                     <div>LIFE SPAN: {dogDetail[0].lifeSpan}</div>
                     
                     
                     </div>
                     
                </div>:


                <div>
                    <center><img className='cargando' src='https://cdn.dribbble.com/users/77598/screenshots/12570694/media/8eaa19b2448ee8719f559e4d1ec931bc.gif' /></center>
                </div>
            
            
            }
             
            
            
        </div>
    )
}