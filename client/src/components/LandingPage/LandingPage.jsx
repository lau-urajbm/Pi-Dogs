import './LandingPage.css'
import React from "react";
import { Link } from "react-router-dom";



export default function LandingPage(){
    
    return(
        <div className='body'>
{/*             <img className='bienvenido' src='https://cdn.dribbble.com/users/1545485/screenshots/4031243/corgi.gif' />
 */}     
      
            <Link to='/home'>
                
            <button className='tohome'><h1 className='HOMEBUT'>HOME</h1></button>
            </Link>
                   
        </div>

    )
}