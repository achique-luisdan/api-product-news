const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require ('uuid');
const bcrypt = require('bcrypt');

const sequelize = require('../configs/database');

const User = sequelize.define('users', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
},  {
  timestamps: true
});

User.addHook('beforeCreate', async (user, options) => {
  user.id = uuidv4().slice(0, 6);
  const pristine = user.password;
  const hash = await bcrypt.hash(pristine, 10);
  user.password = hash;
});

module.exports = User;
