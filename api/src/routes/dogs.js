const { Router } = require('express');
const {Dog, Temperament}=require('../db')
const axios = require('axios')
const{API_KEY}=process.env
require('dotenv').config();

const router = Router()

//obtengo la info de la api
const getApiInfo = async function(){
    
    const urlGet = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    const apiInfo= /* await */ urlGet.data.map(el => {
        
        return {
            weight: parseInt(el.weight.metric)?`${el.weight.metric} Kg`:'no especificado',
            weight_min: parseInt(el.weight.metric.split('-')[0].trim())? parseInt(el.weight.metric.split('-')[0].trim()):parseInt(el.weight.metric.split('-')[1]?.trim())? parseInt(el.weight.metric.split('-')[1]?.trim()):0,
            weight_max: parseInt(el.weight.metric.split('-')[1]?.trim())? parseInt(el.weight.metric.split('-')[1]?.trim()):parseInt(el.weight.metric.split('-')[0].trim())? parseInt(el.weight.metric.split('-')[0].trim()):0,
            height: el.height.metric,
            height_min:parseInt(el.height.metric.split('-')[0].trim())? parseInt(el.height.metric.split('-')[0].trim()):0,
            height_max: parseInt(el.height.metric.split('-')[1]?.trim())? parseInt(el.height.metric.split('-')[1]?.trim()):0,
            name: el.name,
            image: el.image.url,
            lifeSpan: el.life_span,
            id: el.id,
            temperament: el.temperament? el.temperament: 'Sin temperamentos relacionados'

        }
    })
    
    return apiInfo
}  
//obetngo la info de la base de datos
const getBaseInfo= async function(){
    return  await Dog.findAll({
        include:{
            model: Temperament,
            //me traigo el temperamento del modelo temperament
            attributes: ['name'],
            through:{
                attributes:[]
            }
        }
    })
}

//uno toda la info
const getAll = async function(){
    const apiInfo= await getApiInfo()
    const baseInfo = await getBaseInfo()
    const baseInfoApi = baseInfo.map(el => {
        return{
    "id": el.id,
    "name": el.name,
    "height": el.height ,
    "height_min": el.height_min,
    "height_max": el.height_max,
    "weight": el.weight +' kg',
    "weight_min": el.weight_min,
    "weight_max": el.weight_max,
    "lifeSpan": el.lifeSpan,
    "image": el.image,
    "createdInDB": el.createdInDB,
    
    "temperament": el.temperaments.map(el=>el.name).join(', ')
        }
    })
    const allDogs= apiInfo.concat(baseInfoApi)

    return allDogs

}



router.get('/', async function(req, res){
    const {name}= req.query
    
    const todos = await getAll()
    if(name){
        let perroBuscado = todos.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))

        perroBuscado.length ? res.status(200).send(perroBuscado) : res.status(400).send('La raza requerida no fue encontrada')

    }else{ 
    res.status(200).send(todos)
    }

})

router.get('/:id', async function(req, res){
     const {id}=req.params
      const todos= await getAll()

     if(id){
         let razaBuscada = todos.filter(el=>el.id == id)

         razaBuscada.length ? res.status(200).send(razaBuscada): res.status(404).send('id no encontrado')
     }


})

/* {
    "name": "perro", 
    "heightMin": "5", 
    "heightMax":"6",
    "weightMin": "5",
    "weightMax": "6",
    "lifeSpan": "5",
    "temperament":"happy"
    
} */

/* router.post('/', async function(req, res){
    Nombre
Altura (Diferenciar entre altura mínima y máxima)
Peso (Diferenciar entre peso mínimo y máximo)
Años de vida 

const{name, heightMin, heightMax, weightMax, weightMin, lifeSpan,  temperament, image, createdInDB}=req.body
try{
const dog = await Dog.create({
    name, 
    height: `${heightMin} - ${heightMax} `, 
    weight: `${weightMin} - ${weightMax}`,
    lifeSpan: `${lifeSpan} years`,
    image, 
    createdInDB
})


const tempForm = await Temperament.findAll({
    where: {
        name: temperament
    }
})
dog.addTemperament(tempForm)
return res.status(200).send('perro creado con éxito ;)')
}
catch(err){
    console.log(err)
}
   

}) */

module.exports = router;




