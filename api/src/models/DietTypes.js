const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('DietTypes', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  })
  
};