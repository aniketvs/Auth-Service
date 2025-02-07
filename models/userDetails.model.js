const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const User = sequelize.define('user_details', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [10, 10], // ensures exactly 10 characters
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  is_verified:{
    type:DataTypes.BOOLEAN,
    defaultValue:false
  },
}, {
  tableName: 'user_details',
  timestamps: true, 
});

module.exports = User;
