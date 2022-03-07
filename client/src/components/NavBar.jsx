import './NavBar.css'
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation} from "react-router-dom";
import { getDogs } from "../actions";
/*  */


export default function NavBar(){
const dispatch = useDispatch();
const location=useLocation()

const {pathname}=location
const splitLocation = pathname.split("/");

const dogs =useSelector(state=>state.dogs);

function handleClick(event) {
    event.preventDefault();
    dispatch(getDogs())
    
  };

/* const temps = dogs.map(el=>el.temperament?el.temperament :'no hay temperamento') ;   piTemperaments.map(el=>el.split(', ')) 
 const arrtemps = temps.map(el=>el.split(', '))
const temperaments = new Set(arrtemps.flat()) 
const temperaments = temps.join().split(',') */

    return(
        <div className={splitLocation[1] === "dog" ?'navbarForm': 'contenedor1 '}>
           <div className={splitLocation[1] === "dog" ?'logoTextoForm' :'logoTexto'}> <img src='https://i.pinimg.com/originals/49/e9/94/49e994574ccaae7ec41e42e85366f5d1.png' width='20%' className={splitLocation[1] === "dog" ?'logoForm':'logo'}/>
            <h1 className='titulo'><Link to='/home' className='titulo'>DOGS</Link></h1>
            </div>
            <Link to='/dog' className={splitLocation[1] === "dog" ? 'formcreacion':'creacion'}>
                Crea un nuevo perrito
            </Link>
        </div>  
            
            
        
    )
}