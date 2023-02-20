const { Strategy } = require('passport-local');
const { findByEmail } = require('../../users.service');
const bcrypt = require('bcrypt');
const { setSession} = require('../../users.service');

const LocalStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password'
},async (email, password, done) => {
  try {
    const userFound = await findByEmail (email);
    if (!userFound) {
      throw { message: 'User no found' };
    }
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      throw { message: 'Invalid password' };
    }
    const userSession = await setSession(userFound);
    const { id, sessionId } =  userSession.dataValues;
    done(null, { id, email, sessionId });
  } catch (err) {
    return done(err, false);
  }
});

module.exports = LocalStrategy;
