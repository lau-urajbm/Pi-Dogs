import {CREATED_IN, GET_DETALLE, GET_DOGS, GET_RAZA, GET_TEMPERAMENT, GET_TEMPERAMENT_FOR_FILTER, ORDER_BREEDS,   ORDER_WEIGHT
} from "../actions";

const initialState={
    dogs:[],
    allDogs:[],
    detail:[],
    temperaments:[]

}

function rootReducer(state=initialState, action){
    switch(action.type){
        case GET_DOGS: 
        return{
            ...state,
            dogs:action.payload,
            allDogs:action.payload
        }

        case GET_TEMPERAMENT_FOR_FILTER:
        const allDogs = state.allDogs
        /* const temps = allDogs.map(el=>el.temperament?el.temperament :'sin temperamento') ;
        const temperaments = temps.join().split(',') */
        
        const dogsTemp = action.payload === 'All'? allDogs : allDogs.filter((el)=> el.temperament?.includes(action.payload)/* : console.log('sin temperamento') */  )
        console.log(dogsTemp)   
        return{
                ...state,
                dogs: dogsTemp
            } 

        case GET_TEMPERAMENT:
            return{
                ...state,
                temperaments: action.payload

            }

        case CREATED_IN:
            const allDogs2 = state.allDogs
            const dogs = action.payload === 'creados'? allDogs2.filter(el => el.createdInDB) : allDogs2.filter(el => !el.createdInDB)
            return{
                ...state,
                dogs : action.payload === 'All' ? state.allDogs : dogs
            }

        case ORDER_BREEDS:
            const allDogs3= state.allDogs
            let ordenados = action.payload === 'asc' ? allDogs3.sort(function SortArray(x, y){
                return x.name.localeCompare(y.name);
            }): state.dogs.sort(function SortArray(x, y){
                return y.name.localeCompare(x.name);
            })

            return{
                ...state,
                dogs : ordenados
            }

        case ORDER_WEIGHT:
           
            
            const pesos = 
            action.payload === 'asc' && action.payload !== 'sin valor' ? state.dogs.sort(function(a, b){
                if(!a.weight_min ){
                    return a.weight_max - b.weight_min;
                }else{
                 return a.weight_min - b.weight_min;
            }}) :
                
                state.dogs.sort(function(a, b) {
                
                return b.weight_min -a.weight_min;
            });
                return{
                    ...state,
                    dogs : action.payload === 'sin valor' ? state.allDogs : pesos
                }

        case GET_DETALLE:
            return{
                ...state,
                detail: action.payload
            }

        case GET_RAZA:
            return{
                ...state,
                dogs:  action.payload
            }
        
         case 'LIMPIAR_DETALLE':
            return{
                ...state,
                detail:[]
            }
             


        default: return  state
    }

}

export default rootReducer;