const { DataTypes } = require('sequelize');
const sequelize = require('../../libs/database');

const Notice = sequelize.define('notices', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
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
