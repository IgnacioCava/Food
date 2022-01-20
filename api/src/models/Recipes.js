const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  sequelize.define('Recipes', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    resume: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    dietTypes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull:true
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    time: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dishTypes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false
  }); 
};