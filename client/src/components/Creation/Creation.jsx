import './Creation.css' 
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getTemperaments, postNewDog} from "../../actions";
import { Link, useNavigate} from 'react-router-dom';
import NavBar from '../NavBar';


export  function validate(input){
    let errors = {}
    //validador de raza
if(!input.name){
  errors.name = 'El nombre de la raza es requerido';
}else if(/[0-9-]+$/.test(input.name)){
  errors.name = 'el nombre de la raza no es válido';
}
//validador de peso
if(!input.weight_min || !input.weight_max){
  errors.weight = 'Es requerido el peso Mínimo y Máximo'
}else if(!/[0-9-]+$/.test(input.weight_min)  || !/[0-9-]+$/.test(input.weight_max)){
  errors.weight = 'El peso debe ser un número'
}
//validador de altura
if(!input.height_min || !input.height_max){
errors.height = 'Es requerido la altura Mínima y Máxima'
}else if(!/[0-9-]+$/.test(input.height_min)|| !/[0-9-]+$/.test(input.height_max)){
errors.height = 'La altura debe ser un número'
}

//validador de años
if(!input.lifeSpan){
errors.lifeSpan = 'los años de vida son requeridos'
}else if(!/[0-9-]+$/.test(input.lifeSpan )){
errors.lifeSpan = 'Los años de vida deben ser un número'
}

return errors;

}

export default function Creation(){

    const navigate = useNavigate()

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getTemperaments())
    }, [])
    const allTemperaments = useSelector(state=>state.temperaments)
   

    const [errors, setErrors] = useState({})

    const[input, setInput] = useState({
        name: '',
        weight_min: '',
        weight_max: '',
        height_min:'',
        height_max:'',
        lifeSpan:'',
        image:'',
        temperament:[]
    })

   

    function handleInputChange(e){
        setInput({
          ...input,
          //Aqui le cambiamos el nombre a la propiedad del objeto, por eso no queda repetida, sino cambiada
          
          [e.target.name]: e.target.value
        }
        )

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
          }));
    
    }

    function handleSelect(e){
        /* let index = input.temperament.indexOf(e.target.value)

        if(input.temperament[index] === -1 ) */
        setInput(
            {
                ...input,
                temperament:[...input.temperament,  e.target.value] /* (input.temperament +' 🐶'+ e.target.value).split(' 🐶') */
            }
    

        )     
           
    }
    
    function handleSubmit(e){
        e.preventDefault()
        if(errors.name || errors.weight|| errors.height||errors.lifeSpan){
            alert('asegurate de rellenar todos los campos necesarios y cumplir todos los requerimientos')
        }else{
        dispatch(postNewDog(input))
        alert('Raza de perro creada')
        setInput({
            name: '',
            weight_min: '',
            weight_max: '',
            height_min:'',
            height_max:'',
            lifeSpan:'',
            image:'',
            temperament:[]
        })

        navigate('/home')
       
    }}

    function handleDelete(e){
        e.preventDefault()    
        setInput(
            {
            ...input,
            temperament:[]
            }
            )
        }
    

    return(
        
        <div style={{backgroundImage: `url(https://marketplace.canva.com/EAD29RnUHXo/2/0/1600w/canva-turquoise-dogs-and-paw-print-cute-zoom-virtual-background-6nPSmRqEqWw.jpg)`, height:'100vh'}} >
            <NavBar className='navbarForm'/>
            <div className='formularioContenido'>
            
        
        {/* <Link to='/home'>
            <button className='home'>home</button>
            </Link> */}

            <form className='formulario' onSubmit={(e)=>handleSubmit(e)}>
                <div className='contenidoform'>
                    <label>Nombre de la raza:</label>
                    {errors.name && <p className="danger">{errors.name}</p>}
                    <input type='text' name='name' onChange={(e)=>handleInputChange(e)}></input>
                    

                    <label>Url de la imagen:</label>
                    <input type='text' name='image' onChange={(e)=>handleInputChange(e)}></input>
                    
                    <div className='altura'>
                    <label>Altura mínima(cm)</label> 
                    <input type='text' name='height_min' onChange={(e)=>handleInputChange(e)}></input>
                    {errors.height && <p className="danger">{errors.height}</p>}

                    <label>Altura máxima(cm)</label>
                    <input type='text' name='height_max' onChange={(e)=>handleInputChange(e)}></input>
                    {errors.height && <p className="danger">{errors.height}</p>}
                    </div>

                    <div className='peso'>
                    <label>Peso mínimo(Kg)</label>
                    <input type='text' name='weight_min' onChange={(e)=>handleInputChange(e)}></input>
                    {errors.weight && <p className="danger">{errors.weight}</p>}

                    <label>Peso máximo(Kg)</label>
                    <input type='text' name='weight_max' onChange={(e)=>handleInputChange(e)}></input>
                    {errors.weight && <p className="danger">{errors.weight}</p>}
                    </div>

                    <label>Años de vida</label>
                    {errors.lifeSpan && <p className="danger">{errors.lifeSpan}</p>}
                    <input type='text' name="lifeSpan" placeholder='example: 1 - 2' onChange={(e)=>handleInputChange(e)}></input>
                    

                    <label>Elige los distintos <br/> temperamentos de tu raza</label>
                    <select className='temps' onChange={(e)=>handleSelect(e)}>
                        <option>ninguno</option>
                       { allTemperaments.map(temp=> 
                       (
                       <option value={temp.name}> {temp.name} </option>)

)}
                    </select>
                    <div>{input.temperament.map(temp=> 
                    
                     `🐶  ${temp} `
                     
                        
                    )}</div>

                        {input.temperament.length>0 && <input type='button' value='x' onClick={(e)=>handleDelete(e)}  />}
                        
                   

                     <input type="submit" className='enviar'/>
                    
                </div>
                

            </form>
        </div>
        </div>
    )
}