const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo para perro
  sequelize.define('dog', {
    id:{
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4

    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height_min:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    height_max:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight_min:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight_max:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    lifeSpan: {
      type: DataTypes.STRING,
      
    },
    image:{
      type:DataTypes.TEXT,
      defaultValue: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB0IKTnuPwi3jiyshSj3j02U9w2dKRYjySiureLTPXKxKI6aZzUg53Ym8ApCm7mGqgDjc&usqp=CAU'
    },
    createdInDB:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:true
    }
    
    
  },
  
  {          
    timestamps: false,
    createdAt: false,
    updatedAt: false

}
  
  );
};
