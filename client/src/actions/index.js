import axios from 'axios'

export const GET_DOGS='GET_DOGS';
export const CREATED_IN = 'CREATED_IN'
export const GET_TEMPERAMENT_FOR_FILTER ='GET_TEMPERAMENT_FOR_FILTER';
export const GET_TEMPERAMENT = 'GET_TEMPERAMENT'
export const ORDER_BREEDS ='ORDER_BREEDS';
export const ORDER_WEIGHT = 'ORDER_WEIGHT';
export const GET_DETALLE='GET_DETALLE';
export const GET_RAZA='GET_RAZA'; 

/* export const POST_DOG='POST_DOG'; */


/* export function getDogs(){
    return function(dispatch){
        return fetch('http://localhost:3001/dogs')
        .then(res => res.json())
        .then(data =>{
            dispatch({type: GET_DOGS, payload: data})
        })
    }
} */
export function getDogs(){
    return function(dispatch){
        axios(`/dogs`)
        .then(res=>{
            return dispatch({type: GET_DOGS, payload:res.data})
        })
    }
}



/* export function getTemperaments(){
    return function(dispatch){
        return fetch('http://localhost:3001/temperament')
        .then(res=> res.json())
        .then(data=>{
            dispatch({type: GET_TEMPERAMENT, payload: data})
        })
    }
} */
export function getTemperaments(){
    return function(dispatch){
        axios(`/temperament`)
        .then(res=>{
            return dispatch({type: GET_TEMPERAMENT, payload:res.data})
        })
    }
}

export function getTemperamentsForFilter(payload){
    console.log(payload)
    return{
        type: GET_TEMPERAMENT_FOR_FILTER,
        payload
        
    }
}

export function createdIn(payload){
    return{
        type: CREATED_IN,
        payload
    }
}

export function orderBreeds(payload){
    return{
        type: ORDER_BREEDS,
        payload
    }
}

export function orderWeight(payload){
    return{
        type: ORDER_WEIGHT,
        payload

    }
}

/* export function getDetalleRaza(id){
    return function(dispatch){
        return fetch(`http://localhost:3001/dogs/${id}`)
        .then(res=>res.json())
        .then(data=>{
            dispatch({type: GET_DETALLE, payload: data});
        })
    }
} */

export function getDetalleRaza(id){
    return function(dispatch){
        axios(`/dogs/${id}`)
        .then(res=>{
            return dispatch({type: GET_DETALLE, payload:res.data})
        })
    }
}

/*  export function getRaza(raza){
    return function(dispatch){
        return fetch(`http://localhost:3001/dogs?name=${raza}`)
        .then(res=>res.json())
        .then(data=>{
            dispatch({type: GET_RAZA, payload:data});
        })
    }
} */ 
export function getRaza(raza){
    return function(dispatch){
        axios(`/dogs?name=${raza}`)
        .then(res=>{
            return dispatch({type: GET_RAZA, payload:res.data})
        })
    }
}

export function postNewDog(payload){
    return async function(dispatch){
        const res = await axios.post('/dog', payload)
        
       return res
    }
}

export function limpiarDetalle(){
    return{
        type:'LIMPIAR_DETALLE'
    }
}


