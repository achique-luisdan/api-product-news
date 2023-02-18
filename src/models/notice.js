const { DataTypes } = require('sequelize');
const sequelize = require('../../libs/database');

const Notice = sequelize.define('notices', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: true
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true
  },
},  {
  timestamps: true
});

module.exports = Notice;
