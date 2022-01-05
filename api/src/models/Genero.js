const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Genero', {
      name:{
        type: DataTypes.STRING,
        allowNull: false
      },
      
    });
  };
  