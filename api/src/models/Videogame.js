const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    date:{
      type:DataTypes.STRING,
    },
    rating:{
      type:DataTypes.DECIMAL,

    },
    platform:{
      type:DataTypes.STRING,
      allowNull:false
    },
    createdInDb:{
      type: DataTypes.BOOLEAN,
      allowNull : false,
      defaultValue : true
    }
  });
};