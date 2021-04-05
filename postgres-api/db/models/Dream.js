'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dream extends Model {
    static associate(models) {}
  }
  Dream.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      date: { type: DataTypes.DATE, allowNull: false },
      type: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['happy', 'sad', 'exciting', 'scary'],
      },
     
    },
   
    {
    freezeTableName:true,
      sequelize,
      modelName: 'Dream',
    },
    
  );
  return Dream;
};
