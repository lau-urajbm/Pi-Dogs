import './Home.css'
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
/* import { Link } from "react-router-dom"; */
import {  createdIn, getDogs, getTemperamentsForFilter, orderBreeds, orderWeight } from "../../actions";
import { Card } from "../Card";
import NavBar from "../NavBar";
import Paginado from "../Paginado";
import SearchBar from '../SearchBar';
import fondoPerro from '../Creation/perrito.jpg'




export default function Home(){

const dispatch = useDispatch()
const dogs =useSelector(state=>state.dogs)
const allDogs =useSelector(state=>state.allDogs)

const [PagActual, setPagActual] = useState(1);
const [order, setOrder]= useState('')
const [nDogsPag, setNDogsPag] = useState(8)
const IndexlastDog = PagActual * nDogsPag;//8
const indexFirstDog = IndexlastDog - nDogsPag;//0
const currDogs = dogs.slice(indexFirstDog, IndexlastDog); 


function paginado(numPagina){
    setPagActual(numPagina)
    
}

//cuando se monte el componente despacho getDogs
useEffect(()=>{
    dispatch(getDogs())
}, [])

function handleClick(event) {
    event.preventDefault();
    setPagActual(1)
    dispatch(getDogs())
    
  }

function handleTemperamentChange(e){
    e.preventDefault()
    setPagActual(1)
    dispatch(getTemperamentsForFilter(e.target.value))

} 

function handleCreatedFilter(e){
    dispatch(createdIn(e.target.value))
}

function handleOrderBreeds(e){
    e.preventDefault();
    dispatch(orderBreeds(e.target.value))
    setPagActual(1)
    setOrder(e.target.value)
}

function handleOrderWeight(e){
    
    dispatch(orderWeight(e.target.value))
    setPagActual(1)
    setOrder(e.target.value)
}


const temps = allDogs.map(el=>el.temperament?el.temperament :'no hay temperamento') ;
const arrTemperaments = temps.map(el=>el.split(',')).flat()

const arrTemps= arrTemperaments.map(el => {
    return el.trim()
});

const temperaments = new Set(arrTemps)
console.log('a',temperaments)

const temp = []
for (var el of temperaments) {
    if(el){
        
    temp.push(el)
}
}
temp.sort() 
/* console.log(temp.sort()) */
 



 /* arrTemperaments.forEach(el=>{
    if(!temp.includes(el)){
        temp.push(el)
       
    }
}) */
/* const temperaments = arrTemperaments.reduce((acc,item)=>{
    if(acc.indexOf(item)<0){
        acc.push(item);
    }
       
},[]) a*/




    return(
        <div style={{backgroundImage: `url(https://as1.ftcdn.net/v2/jpg/04/52/52/36/1000_F_452523638_dEyWoXxaSyaVAetlpAnKd3lItFnASsGo.jpg)`, }}>
            <NavBar/>
            {allDogs.length >0?
            <div className='filtros'>
            <SearchBar/>
            
            {/* <Link to='/dog'>
                Crea un nuevo perrito
            </Link>
    <h1>DOGS</h1>}*/}
             



            <label>Choose a temperament:</label>
            <select className='opciones' onChange={e=>handleTemperamentChange(e)}>
            <option value='All'>All</option>
             {temp?.map(el=>{
                return(
               
                   <option value={el}>{el}</option>
               
                )
            })}
            </select>

            <label >Breeds:</label>
            <select name={"raza"} onChange={(e)=>handleCreatedFilter(e)}>
            <option value='All'>All</option>
            <option value='existentes'>Existentes</option>
            <option value='creados'>Creadas</option>
             {/* {dogs?.map(el=>{
                return(
                   <option value={el.name} key={el.id}>{el.name}</option>
                )
            })}*/}
            
            </select>

            <button onClick={(e)=>handleClick(e) } className='boton'>
                volver a cargar todos los perritos
            </button>
            <label>Weight:</label>
            <select name="pesos en orden" onChange={(e)=>handleOrderWeight(e)} >
                <option value='sin valor'>All</option>
                <option value='asc'>asc</option>
                <option value='descendente'>desc</option>
            </select>

            
            <select name="razas en orden" onChange={(e)=>handleOrderBreeds(e)} >
                {/* <option value='ordenar' >ordenar por raza</option> */}
                <option value='asc'>a-z</option>
                <option value='desc'>z-a</option>
            </select>
            </div>
:
        
<div style={{height:'100vh'}}><center><img src='https://cdn.dribbble.com/users/908372/screenshots/4812323/loading2.gif' width='30%'  className='load' ></img></center></div> }
            
        <div className='contenedor'>
            {currDogs?.map(el=>{
                return(
               <div className='card'> 
               <Link to={`/home/${el.id}`} className='detalle'>
               <Card name={el.name} image={el.image} temperament={el.temperament} weight={el.weight_min===0 && el.weight_max===0? el.weight:el.weight_min !==0&&el.weight_min !==el.weight_max?el.weight_min +'-'+el.weight_max +' kg': el.weight_max+' kg'/* el.weight */} key={el.id} />
               </Link>
               </div>
                )
            })}
        </div> 
        <Paginado nDogsPag={nDogsPag} dogs={dogs.length} paginado={paginado} />

        </div>
        
        

    )
    
    

}

