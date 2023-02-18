const { DataTypes } = require('sequelize');
const sequelize = require('../../libs/database');
const Notice = require('./notice');

const Category = sequelize.define('categories', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  }
},  {
  timestamps: true
});

Category.hasMany(Notice, {
  foreignKey: 'categoryId',
  sourceKey: 'id'
});

Notice.belongsTo (Category, {
  foreignKey: 'categoryId',
  targetKey: 'id'
});

module.exports = Category;

