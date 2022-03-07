const { Router } = require('express');
const {Dog, Temperament}=require('../db')

const router = Router()

router.post('/', async (req, res)=>{
    

const{name, height_min, height_max, weight_max, weight_min, lifeSpan,  temperament, image, createdInDB}=req.body
try{
let dog = await Dog.create({
    name, 
    height: `${height_min} - ${height_max}`, 
    height_min: parseInt(height_min),
    height_max:parseInt(height_max),
    weight: `${parseInt(weight_min)} - ${parseInt(weight_max)}`, 
    weight_min:parseInt(weight_min),
    weight_max:parseInt(weight_max),
    lifeSpan: `${lifeSpan} years`,
    image, 
    createdInDB,
    
    
})


let tempForm = await Temperament.findAll({
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
   

})

module.exports = router;