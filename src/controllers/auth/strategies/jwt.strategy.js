const { Strategy, ExtractJwt } = require('passport-jwt');

const { configs } = require('../../../configs/configs');
const { isSessionActivated } = require('../../users.service');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: configs.secret
};

const JwtStrategy = new Strategy(options, async (payload, done) => {
  const isActivated = await isSessionActivated (payload.sessionId);
  if (!isActivated) {
    return done(null, false);
  } else {
    return done(null, payload);
  }
});

module.exports = JwtStrategy;
