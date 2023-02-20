
const User = require('../models/user');
const { v4: uuidv4 } = require ('uuid');

async function registerUser(req, res) {
  try {
    const user = req.body;
    if (!user || !user.email) {
      return res.status(400).json({ message: 'Email is missing' });
    }
    else if (!user || !user.password) {
      return res.status(400).json({ message: 'Password is missing' });
    }
    const userCreated = await User.create({
      ...user,
    });
    if(userCreated){
      const { id, email } = userCreated;
      res.status(201).json({id, email});
    }
  } catch (err) {
    if (err && err.errors && err.errors.length > 0) {
      err.errors = err.errors.map(error => {
        const { message, path, value, type } = error;
        return {
          tag: `TAG_${type.replace(/\s+/g, '_').toUpperCase()}`,
          message: `${message.charAt(0).toUpperCase()}${message.slice(1)}`,
          field: path,
          value
        };
      });
    }
    res.status(500).json({ 'errors': err.errors });
  }
}

async function findByEmail(email) {
  const userFound = await User.findOne({
    where: { email }
  });
  if (!userFound) {
    return null;
  }
  return userFound;
}

async function setSession(user) {
  const userSession = user;
  userSession.set ({
    ...user.dataValues,
    sessionId: uuidv4()
  });
  const userFound = await userSession.save({
    fields: ['sessionId' ]
  });
  return userFound;
}

async function isSessionActivated(sessionId) {
  const userFound = await User.findOne({
    where: { sessionId }
  });
  return userFound && userFound.id && userFound.sessionId;
}

module.exports = {
  registerUser,
  findByEmail,
  setSession,
  isSessionActivated
};
