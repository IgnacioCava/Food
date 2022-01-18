const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('diet_type', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT('medium'),
      allowNull: false
    },
  })
  
};