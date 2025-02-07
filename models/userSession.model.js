const {DataTypes}=require('sequelize');
const sequelize=require('../config/config');

const UserSession=sequelize.define('user_session',
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        user_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        token:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        created_at:{
            type:DataTypes.DATE,
            defaultValue:DataTypes.NOW
        },
        expires_at:{
            type:DataTypes.DATE,
            allowNull:false
        }
    },
    {
    tableName: 'user_session',
    timestamps: false
  });
module.exports=UserSession;