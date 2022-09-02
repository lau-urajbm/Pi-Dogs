import './LandingPage.css'
import React from "react";
import { Link } from "react-router-dom";



export default function LandingPage(){
    
    return(
        <div style={{backgroundImage: `url(https://as1.ftcdn.net/v2/jpg/04/52/52/36/1000_F_452523638_dEyWoXxaSyaVAetlpAnKd3lItFnASsGo.jpg)`, width:'100vw', height:'100vh'}} className='body'>
{/*             <img className='bienvenido' src='https://cdn.dribbble.com/users/1545485/screenshots/4031243/corgi.gif' />
 */}     
      
            <Link to='/home'>
                
            <center><button className='tohome' style={{marginTop:'250px'}}><h1 className='HOMEBUT'>HOME</h1></button></center>
            </Link>
                   
        </div>

    )
}