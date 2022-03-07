import './SearchBar.css'
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRaza } from "../actions";

export default function SearchBar(){
    const[raza, setRaza]= useState('')

    const dispatch = useDispatch();

    function handleChange(e){
        e.preventDefault();
        setRaza(e.target.value)
        console.log(raza)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getRaza(raza))
        
        setRaza('')
    }

    return(
        <div className='busqueda'>
            <input className="buscar" type='text' placeholder="buscar raza" onChange={(e)=>handleChange(e) } value={raza}></input>
            <button className='busca' type="submit" onClick={(e)=>handleSubmit(e)} >Buscar</button>
        </div>
    )

}