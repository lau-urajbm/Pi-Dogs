const { Router } = require('express');
require('dotenv').config();
const {Temperament}=require('../db')
const axios = require('axios')

const router = Router()

const getApiInfo = async function(){
    
    const urlGet = await axios.get("http://api.thedogapi.com/v1/breeds")
    const apiInfo= await urlGet.data.map(el => {
        return {
            weight: el.weight.metric,
            height: el.height.metric,
            name: el.name,
            image: el.image.url,
            lifeSpan: el.life_span,
            id: el.id,
            temperament: el.temperament

        }
    })
    return apiInfo
} 

router.get('/', async function(req, res){
    try{
        const validation = await Temperament.findAll()
        
        if(validation.length > 0){
            /* console.log('entró') */
            return res.status(200).send(validation)
        }else{

    const apiInfo = await getApiInfo()
    const apiTemperaments = apiInfo.map(el=>el.temperament? el.temperament :'sin temperamento')

  /*  const arrTemperaments = apiTemperaments.join().split(',') */
  const arrTemperaments = apiTemperaments.map(el=>el.split(', '))
   const temperaments = new Set(arrTemperaments.flat())
   

  

     for (el of temperaments) {if (el) await Temperament.findOrCreate({
        where: { name: el }})
  }  
   const allTemperaments = await Temperament.findAll()
   res.status(200).send(allTemperaments)}
    }catch(err){
        res.send(err)
    }

})





module.exports = router;